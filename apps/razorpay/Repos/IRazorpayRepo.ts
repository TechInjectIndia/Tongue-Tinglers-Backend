import { PaymentLinks } from "razorpay/dist/types/paymentLink";
import {
    PaymentLinkPayload,
} from "../models/Razorpay";
import { Request, Response } from "express";
import {DTO} from "../../common/models/DTO";
import {Payments} from "razorpay/dist/types/payments";

export interface IRazorpayRepo {
    createRazorpayOrder(orderId: string, amount: number): Promise<any>;

    getPaymentDetails(paymentId: string): Promise<any>;

    cancelPaymentLink(id: string): Promise<any>;

    generateRefund(paymentId: string, amount: number): Promise<any>;

    getTransaction(paymentId: string): Promise<DTO<Payments.RazorpayPayment>>

    createPaymentLink(
        paymentLinkRequest: PaymentLinkPayload
    ): Promise<PaymentLinks.RazorpayPaymentLink>;

    callback(req: Request, res: Response): Promise<Response>;

    // saveWebhookEvent(event: any, id: string): Promise<null>;

}
