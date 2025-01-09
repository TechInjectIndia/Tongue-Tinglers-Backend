import {
    DTO,
    getHandledErrorDTO,
    getSuccessDTO,
    getUnhandledErrorDTO,
} from "../../../common/models/DTO";
import { IPaymentGatewayProvider } from "../IPaymentGatewayProvider";
import { CURRENCY_TYPE, RPCaptureOrderData, RPWEventData } from "./models/RPModels";
import { Orders } from "razorpay/dist/types/orders";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { Payments } from "razorpay/dist/types/payments";
import { validateWebhookSignature } from "./utils/razorpay-utils";
import { config } from "dotenv";
import Razorpay = require("razorpay");
import { PaymentPayload } from "./models/PaymentPayload";
import { handleError } from "apps/common/utils/HelperMethods";
import { getUid } from "apps/common/utils/commonUtils";
import { RPWPaymentEntity } from "apps/razorpay/models/RPModels";
import { ORDER_CURRENCY, ParsedOrder } from "apps/order/interface/Order";
import { Payment, PAYMENT_MODE, PaymentStatus } from "./Payment";

config();

class RazorpayProvider
    implements
        IPaymentGatewayProvider<
            Orders.RazorpayOrder,
            RPCaptureOrderData,
            Payments.RazorpayPayment,
            RPWEventData
        >
{
    private readonly WEB_SIGNATURE_HEADER = "x-razorpay-signature";

    async createPaymentOrder(payload: PaymentPayload): Promise<DTO<Orders.RazorpayOrder>> {
        try {
            const body: Orders.RazorpayOrderCreateRequestBody = {
                currency: CURRENCY_TYPE.INR,
                receipt: payload.orderId,
                amount: Number((Number(payload.amount) * 100).toFixed(2)),
                // notes: [payload.orderId],
            };

            const rpInstance = RazorpayProvider.getRazorpayInstance();

            const rpOrder: Orders.RazorpayOrder = await rpInstance.orders.create(body);

            return getSuccessDTO(rpOrder);
        } catch (error: any) {
            handleError(error);
            return getUnhandledErrorDTO(
                error.message ?? `error while creating payment order for ${payload.orderId}`
            );
        }
    }

    async verifyPayment(payload: RPCaptureOrderData): Promise<DTO<Payments.RazorpayPayment>> {
        try {
            const rpInstance: Razorpay = RazorpayProvider.getRazorpayInstance();

            const validation = validatePaymentVerification(
                {
                    order_id: payload.orderId!,
                    payment_id: payload.paymentId!,
                },
                payload.signature,
                RazorpayProvider.getWebHookSecret()
            );

            if (!validation) {
                return getUnhandledErrorDTO(`validation failed for ${payload.orderId} in polling`);
            } else {
                const paymentDetails: Payments.RazorpayPayment = await rpInstance.payments.fetch(
                    payload.paymentId
                );

                return getSuccessDTO(paymentDetails);
            }
        } catch (error: any) {
            handleError(error);

            return getUnhandledErrorDTO(error?.message, error);
        }
    }

    static getRazorpayInstance() {
        if (process.env.ENV === "PROD") {
            return new Razorpay({
                key_id: process.env.RP_ID_PROD,
                key_secret: process.env.RP_SECRET_PROD,
            });
        }

        return new Razorpay({
            key_id: process.env.RP_ID_DEV,
            key_secret: process.env.RP_SECRET_DEV,
        });
    }

    parseWebhookEvent(rawData: any): DTO<RPWEventData> {
        try {
            const eventData: RPWEventData = {
                id: getUid(),
                event: rawData.event,
                payload: {
                    payment: rawData.payload?.payment?.entity ?? null,
                    order: rawData.payload?.order ?? null,
                    refund: rawData.payload?.refund?.entity ?? null,
                    created_at: rawData.created_at ?? "",
                },
                createdAt: new Date(),
                isValid: false,
                order_id: null,
                payment_id: null,
            };

            const paymentPayload = eventData.payload.payment;
            const orderPayload = eventData.payload.order;

            if (paymentPayload) {
                eventData.order_id = paymentPayload.order_id;
                eventData.payment_id = paymentPayload.id;
            } else if (orderPayload) {
                eventData.order_id = orderPayload.id;
            }

            return getSuccessDTO(eventData);
        } catch (error: any) {
            // only when bad raw data is sent. in the case of invalid webhook calls
            handleError(error, null);
            return getUnhandledErrorDTO(error.message ?? `error while parsing webhook`);
        }
    }

   
    static getWebHookSecret = (): string => {
        return process.env.ENV === "PROD" ? process.env.RP_WEBHOOK_SECRET_PROD : process.env.RP_WEBHOOK_SECRET_DEV;
    };

    //////////////////////////// PRIVATE /////////////////////////////////

    parsePaymentObject(rpPayment: RPWPaymentEntity, order: ParsedOrder): Payment {
        const createdAt = new Date(rpPayment.created_at * 1000);

        const uid = order.customerDetails.id;
        const userName = order.customerDetails.firstName;
        const email = order.customerDetails.email;

        const amountInRupees = Number(rpPayment.amount) / 100;
        const feeInRupees = Number(rpPayment.fee) / 100;
        const res: Payment = {
            amount: amountInRupees,
            email: email,
            feeCurrency: ORDER_CURRENCY.INR,
            orderId: order.id.toString(),
            uid: uid,
            username: userName,
            mode: PAYMENT_MODE.ON_PAGE,
            tokenId: rpPayment.order_id,
            transactionId: rpPayment.id,
            paymentLink: null,
            status: this.mapRazorpayPaymentStatus(rpPayment.status),
            createdAt,
            updatedAt: createdAt, // Set your updated_at date or leave it as is
            fee: feeInRupees,
            originalObj: rpPayment,
            // Add other properties based on your Payment interface
        };
        return res;
    }

    mapRazorpayPaymentStatus(
        status: "created" | "authorized" | "captured" | "refunded" | "failed"
    ): PaymentStatus {
        switch (status) {
            case "created":
                return PaymentStatus.PENDING;
            case "authorized":
                return PaymentStatus.PENDING;
            case "captured":
                return PaymentStatus.COMPLETED;
            case "refunded":
                return PaymentStatus.REFUNDED;
            case "failed":
                return PaymentStatus.FAILED;
            default:
                return PaymentStatus.FAILED;
        }
    }
}

export { RazorpayProvider };
