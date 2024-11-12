const Razorpay = require("razorpay");
import { NextFunction, Request, Response } from "express";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { sendResponse, createStandardPaymentLinkForOrders, CreatePaymentIntentWithRazorpay, sendEmail, EMAIL_HEADING, getEmailTemplate, EMAIL_TEMPLATE } from "../../../libraries";
import { OrderRepo } from "../../ecommerce/models/orders";
import { OrderItemRepo } from "../../ecommerce/models/orders-item";
import { UserAddressRepo } from "../../user-address/models/UserAddressRepo";
import { ShippingHistoryRepo } from "../../ecommerce/models/shippingHistoryRepo";
import { CONFIG } from "../../../config";
import { get } from "lodash";
import { CartModel } from "../../../database/schema";
import { CartRepo } from "../../cart/models/CartRepo";
import { CartItemModel } from "../../../database/schema";
import { FranchiseeModel } from "../../../database/schema";
import { ORDER_TYPE, PAYMENT_STATUS, ShippingStatus } from '../../../interfaces';
import { OrderStatus } from "../../../types";
import { AnyCnameRecord } from "dns";
const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");

const razorpayInstance = new Razorpay({
    key_id: CONFIG.RP_ID_PROD,
    key_secret: CONFIG.RP_SECRET_PROD,
});

export default class OrderPaymentController {
    static async callback(req: Request, res: Response, next: NextFunction) {
        const webhookSignature = req.headers["x-razorpay-signature"];
        const body = req.body;
        const isVerified = validateWebhookSignature(
            JSON.stringify(body),
            webhookSignature,
            CONFIG.RP_WEBHOOK_SECRET
        );
        console.log('payment body', body);
        if (isVerified) {
            if (
                body.payload &&
                body.payload.payment_link &&
                body.payload.payment_link.entity
            ) {
                const paymentId = body.payload.payment_link.entity.id;
                const status = body.payload.payment_link.entity.status;
                const orderDetails = await new OrderRepo().getOrderByPaymentId(paymentId as string);
                if (orderDetails) {
                    let paymentStatus = orderDetails.paymentStatus;
                    if (status.toLowerCase() === "paid") {
                        paymentStatus = PAYMENT_STATUS.PAID;
                    } else {
                        paymentStatus = PAYMENT_STATUS.UNPAID;
                    }
                    await new OrderRepo().update(
                        orderDetails.id as string,
                        { paymentStatus }
                    );
                }
            }
            return res.status(200).send({ message: "Webhook Done" });
        } else {
            console.log("Webhook not verified");
            return res.status(200).send({ message: "Webhook not verified" });
        }
    }

    static async fetchPayment(req: Request, res: Response, next: NextFunction) {
        try {
            const { paymentId } = req.params;
            if (!paymentId) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Payment ID is required."
                        )
                    );
            }

            const paymentDetailsFromRazorpay = await razorpayInstance.payments.fetch(paymentId);
            if (!paymentDetailsFromRazorpay) {
                return res
                    .status(404)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Payment not found in Razorpay."
                        )
                    );
            }
            console.log(
                "Payment Details from Razorpay:",
                paymentDetailsFromRazorpay
            );

            const paymentDetailsFromRepo =
                await new OrderRepo().getOrderByPaymentId(paymentId);
            if (!paymentDetailsFromRepo) {
                return res
                    .status(404)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Payment not found in local repository."
                        )
                    );
            }
            console.log(
                "Payment Details from Repository:",
                paymentDetailsFromRepo
            );

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    "Payment details fetched successfully.",
                    {
                        paymentDetailsFromRazorpay: paymentDetailsFromRazorpay,
                        paymentDetailsFromRepo: paymentDetailsFromRepo,
                    }
                )
            );
        } catch (err) {
            console.error("Error fetching payment details:", err);
            return res.status(500).send({ message: err });
        }
    }

    static async generatePaymentLink(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            // get cart & cart items
            const userId = get(req, 'user_id', '');

            // Find if the cart already exists for the user
            let cart = await new CartRepo().findById(userId);
            if (!cart) {
                return res
                    .status(404)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, "Cart is empty"));
            }

            let franchiseData = await FranchiseeModel.findOne({ where: { userid: userId } });
            if (!franchiseData) {
                return res
                    .status(404)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, "Franchise is missing"));
            }

            const link = await createStandardPaymentLinkForOrders({
                cart: cart,
                franchise: franchiseData
            });

            console.log('link', link.id);
            if (!link) {
                return res
                    .status(500)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Failed to create payment link."
                        )
                    );
            }

            // Create the order and save order items
            const newOrder = await new OrderRepo().create({
                userId: userId as string,
                trackingNumber: "" as string,
                shippingAddress: "" as string,
                paymentMethod: "Razorpay" as string,
                paymentId: link.id,
                totalPrice: cart.totalAmount as number,
                isRepeated: 0 as number,
                orderStatus: OrderStatus.PROCESSED,
                paymentStatus: PAYMENT_STATUS.PROCESSED,
                orderType: ORDER_TYPE.SAMPLE_ORDER,
            });

            // Save each cart item as an order item
            const orderItems = cart.items.map(item => ({
                orderId: newOrder.id as string,
                userId: userId as string,
                productId: item.productId as number,
                productType: item.productType as string,
                quantity: item.quantity as number,
                price: item.price as number,
                subtotal: item.subtotal as number,
            }));

            await new OrderItemRepo().bulkCreate(orderItems);

            const shippingPayload = {
                orderId: newOrder.id as string,
                activities: [{
                    status: ShippingStatus.OrderReceived,
                    time: new Date().toISOString()
                }],
                trackingNumber: null,
                date: new Date().toISOString()
            };
            await new ShippingHistoryRepo().addShippingHistory(newOrder.id as string, shippingPayload);

            // Remove all products related to the cart
            await CartItemModel.destroy({
                where: { cart_id: cart.id },
            });

            const cartData = await CartModel.destroy({
                where: { id: cart.id },
            });

            try {
                const emailContent = await getEmailTemplate(
                    EMAIL_TEMPLATE.PAYMENT_REQUEST,
                    {
                        email: franchiseData.contactEmail,
                        link: link.short_url,
                    }
                );

                const mailOptions = {
                    to: franchiseData.contactEmail,
                    subject: EMAIL_HEADING.PAYMENT_REQUEST,
                    templateParams: {
                        heading: EMAIL_HEADING.PAYMENT_REQUEST,
                        description: emailContent,
                    },
                };

                await sendEmail(
                    mailOptions.to,
                    mailOptions.subject,
                    mailOptions.templateParams
                );
            } catch (emailError) {
                console.error("Error sending email:", emailError);
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        link
                    )
                );
        } catch (err) {
            console.error("Error generating payment link:", err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }


    static async createOrderAndClearCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { paymentId } = req.body;

            // get cart & cart items
            const userId = get(req, 'user_id', '');

            // Find if the cart already exists for the user
            let cart = await new CartRepo().findById(userId);
            if (!cart) {
                return res
                    .status(404)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, "Cart is empty"));
            }

            let franchiseData = await FranchiseeModel.findOne({ where: { userid: userId } });
            if (!franchiseData) {
                return res
                    .status(404)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, "Franchise is missing"));
            }

            const getUserActiveAddress = await new UserAddressRepo().getActiveAddress(userId as string);

            // Create the order and save order items
            const newOrder = await new OrderRepo().create({
                userId: userId as string,
                trackingNumber: "" as string,
                shippingAddress: getUserActiveAddress,
                paymentMethod: "Razorpay" as string,
                paymentId: paymentId,
                totalPrice: cart.totalAmount as number,
                isRepeated: 0 as number,
                orderStatus: OrderStatus.PROCESSED,
                paymentStatus: PAYMENT_STATUS.PROCESSED,
                orderType: ORDER_TYPE.SAMPLE_ORDER,
            });

            // Save each cart item as an order item
            const orderItems = cart.items.map(item => ({
                orderId: newOrder.id as string,
                userId: userId as string,
                productId: item.productId as number,
                productType: item.productType as string,
                quantity: item.quantity as number,
                price: item.price as number,
                subtotal: item.subtotal as number,
            }));

            await new OrderItemRepo().bulkCreate(orderItems);

            const shippingPayload = {
                orderId: newOrder.id as string,
                activities: [{
                    status: ShippingStatus.OrderReceived,
                    time: new Date().toISOString()
                }],
                trackingNumber: null,
                date: null
            };
            await new ShippingHistoryRepo().addShippingHistory(newOrder.id as string, shippingPayload);

            // Remove all products related to the cart
            await CartItemModel.destroy({
                where: { cart_id: cart.id },
            });

            const cartData = await CartModel.destroy({
                where: { id: cart.id },
            });

            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED, newOrder)
            );
        } catch (error) {
            console.error("Error during order creation or clearing the cart:", error);
            return res.status(500).send({ message: "Error during order creation or cart clearing" });
        }
    }


    static async createPaymentIntent(req: Request, res: Response, next: NextFunction) {
        try {
            // Get user ID from request
            const userId = get(req, 'user_id', '');

            // Find if the cart already exists for the user
            let cart = await new CartRepo().findById(userId);
            if (!cart || cart.items.length === 0) {
                return res
                    .status(404)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, "Cart is empty"));
            }

            // Retrieve franchisee data
            let franchiseData = await FranchiseeModel.findOne({ where: { userid: userId } });
            if (!franchiseData) {
                return res
                    .status(404)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, "Franchise is missing"));
            }

            // Calculate total amount from cart items (Example: summing up all item prices)
            const totalAmount = cart.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

            // Prepare the data for CreatePaymentIntentWithRazorpay function
            const data = {
                cart: {
                    totalAmount
                },
                franchise: franchiseData
            };

            // Call the utility function to create payment intent
            const paymentIntentResponse = await CreatePaymentIntentWithRazorpay(data);

            if (paymentIntentResponse.status === 500) {
                return res.status(500).send(sendResponse(RESPONSE_TYPE.ERROR, paymentIntentResponse.message));
            }

            // Return success response with payment intent ID
            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, "Payment intent created successfully.", {
                    paymentIntentId: paymentIntentResponse.data.paymentIntentId,
                })
            );
        } catch (error) {
            console.error("Error creating payment intent:", error);
            return res.status(500).send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
        }
    }
}