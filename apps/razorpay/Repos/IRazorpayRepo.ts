import {
    PaymentLinkPayload,
    RazorpayPaymentLinkResponse,
} from "../models/Razorpay";

export interface IRazorpayRepo {
    createRazorpayOrder(orderId: string, amount: number): Promise<any>;

    getPaymentDetails(paymentId: string): Promise<any>;

    cancelPaymentLink(id: string): Promise<any>;

    generateRefund(paymentId: string, amount: number): Promise<any>;

    createPaymentLink(paymentLinkRequest: PaymentLinkPayload): Promise<RazorpayPaymentLinkResponse>;
}
