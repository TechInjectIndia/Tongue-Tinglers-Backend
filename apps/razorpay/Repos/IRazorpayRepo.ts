import { PaymentLinks } from "razorpay/dist/types/paymentLink";
import {
    PaymentLinkPayload,
} from "../models/Razorpay";
import { Request, Response } from "express";

export interface IRazorpayRepo {
    createRazorpayOrder(orderId: string, amount: number): Promise<any>;

    getPaymentDetails(paymentId: string): Promise<any>;

    cancelPaymentLink(id: string): Promise<any>;

    generateRefund(paymentId: string, amount: number): Promise<any>;

    createPaymentLink(
        paymentLinkRequest: PaymentLinkPayload
    ): Promise<PaymentLinks.RazorpayPaymentLink>;

    callback(req: Request, res: Response): Promise<Response>;

    // saveWebhookEvent(event: any, id: string): Promise<null>;

}
