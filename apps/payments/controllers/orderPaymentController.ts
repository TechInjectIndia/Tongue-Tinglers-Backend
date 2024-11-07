const Razorpay = require("razorpay");
import { NextFunction, Request, Response } from "express";
import {
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
} from "../../../constants";
import { CartRepo } from '../../cart/models/CartRepo'
import {
    sendResponse,
    createStandardPaymentLinkForOrders,
    sendEmail,
    EMAIL_HEADING,
    getEmailTemplate,
    EMAIL_TEMPLATE,
} from "../../../libraries";
import { ContractRepo } from "../../contracts/models/ContractRepo";
import { OrderRepo } from "../../ecommerce/models/orders";
import { OrderItemRepo } from "../../ecommerce/models/orders-item";
import {
    CONTRACT_PAYMENT_STATUS,
    CONTRACT_STATUS,
    ITrackable,
} from "../../../interfaces";
import { ContractPaymentDetails } from "../../../interfaces";
import { CONFIG } from "../../../config";
const {
    validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
import { get } from "lodash";
import { CartModel } from "../../../database/schema";
import { CartItemModel } from "../../../database/schema";
import { FranchiseeModel } from "../../../database/schema";
import { ORDER_TYPE, ORDER_STATUS } from '../../../interfaces';

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
        if (isVerified) {
            if (
                body.payload &&
                body.payload.payment_link &&
                body.payload.payment_link.entity
            ) {
                const paymentId = body.payload.payment_link.entity.id;
                const status = body.payload.payment_link.entity.status;
                const contractDetails =
                    await new ContractRepo().getContractByPaymentId(
                        paymentId as string
                    );
                if (contractDetails) {
                    const paymentDetails: ContractPaymentDetails = {
                        paymentId: paymentId,
                        amount: body.payload.payment_link.entity.amount,
                        date: new Date(),
                        status: status,
                        additionalInfo: "",
                    };

                    let contractStatus = contractDetails.status;

                    if (status.toLowerCase() === "paid") {
                        contractStatus = CONTRACT_STATUS.PAYMENT_RECEIVED;
                    }
                    await new ContractRepo().updatePaymentStatus(
                        contractDetails.id,
                        contractDetails.payment as unknown as ContractPaymentDetails[],
                        contractStatus
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

            const paymentDetailsFromRazorpay =
                await razorpayInstance.payments.fetch(paymentId);
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
                await new ContractRepo().getPaymentById(paymentId);
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
            let cart = await CartModel.findOne({ where: { userId } });
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
                userId: userId,
                trackingNumber: "",
                shippingAddress: "",
                paymentMethod: "Razorpay",
                totalPrice: cart.totalAmount,
                isRepeated: 0,
                orderStatus: ORDER_STATUS.PROCESSED,
                orderType: ORDER_TYPE.SAMPLE_ORDER,
            });

            // // Save each cart item as an order item
            const orderItems = cart.items.map(item => ({
                orderId: newOrder.id,
                userId: userId,
                productId: item.productId,
                productType: item.productType,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.subtotal,
            }));

            await new OrderItemRepo().bulkCreate(orderItems);

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
}
