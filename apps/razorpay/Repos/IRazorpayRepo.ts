import { PaymentLinks } from "razorpay/dist/types/paymentLink";
import {
    PaymentLinkPayload,
} from "../models/Razorpay";

export interface IRazorpayRepo {
    createRazorpayOrder(orderId: string, amount: number): Promise<any>;

    getPaymentDetails(paymentId: string): Promise<any>;

    cancelPaymentLink(id: string): Promise<any>;

    generateRefund(paymentId: string, amount: number): Promise<any>;

    createPaymentLink(
        paymentLinkRequest: PaymentLinkPayload
    ): Promise<PaymentLinks.RazorpayPaymentLink>;

    callback(req: Request, res: Response): Promise<Response>

}
