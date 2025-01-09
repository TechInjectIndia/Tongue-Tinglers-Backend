import { Order } from "sequelize";
import { DTO } from "../../common/models/DTO";
import { RPWEventData, RPWPaymentEntity } from "../models/RPModels";
import { PaymentPayload } from "./razorpay/models/PaymentPayload";
import { Payment } from "./razorpay/Payment";
import { ParsedOrder } from "apps/order/interface/Order";

interface IPaymentGatewayProvider<O, V, VR, WB> {
    createPaymentOrder(payload: PaymentPayload): Promise<DTO<O>>;

    verifyPayment(payload: V): Promise<DTO<VR>>;

    // Webhooks
    parseWebhookEvent(body: any): DTO<WB>;



    parsePaymentObject(rpPayment: RPWPaymentEntity, order: ParsedOrder): Payment;

    // refund
    // refundPayment(transactionId: string, amount: number): Promise<string>;
}

export { IPaymentGatewayProvider };
