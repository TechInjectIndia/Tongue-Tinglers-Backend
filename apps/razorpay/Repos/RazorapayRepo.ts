import { Request, Response } from "express";
import { PaymentLinkPayload } from "../models/Razorpay";
import { CONFIG } from "../../../config";
import { IRazorpayRepo } from "./IRazorpayRepo";
import { PaymentLinks } from "razorpay/dist/types/paymentLink";
import Razorpay from "razorpay";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import { parseAndSaveEvent } from "../utils/razorpay-utils";

export class RazorpayRepo implements IRazorpayRepo {
  private readonly razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: CONFIG.RP_ID_PROD,
      key_secret: CONFIG.RP_SECRET_PROD,
    });
  }

  async createRazorpayOrder(orderId: string, amount: number): Promise<any> {
    try {
      const order = await this.razorpay.orders.create({
        amount: amount * 100, // Amount in paisa
        currency: "INR",
        receipt: orderId,
      });
      return order;
    } catch (error) {
      throw new Error(`Error creating Razorpay order: ${error.message}`);
    }
  }

  async getPaymentDetails(paymentId: string): Promise<any> {
    try {
      const paymentDetails = await this.razorpay.payments.fetch(paymentId);
      return paymentDetails;
    } catch (error) {
      throw new Error(`Error fetching payment details: ${error.message}`);
    }
  }

  async cancelPaymentLink(id: string): Promise<any> {
    try {
      const response = await this.razorpay.paymentLink.cancel(id);
      return response;
    } catch (error) {
      throw new Error(`Error canceling payment link: ${error.message}`);
    }
  }

  async generateRefund(paymentId: string, amount: number): Promise<any> {
    try {
      const refund = await this.razorpay.payments.refund(paymentId, {
        amount: amount * 100, // Amount in paisa
      });
      return refund;
    } catch (error) {
      throw new Error(`Error generating refund: ${error.message}`);
    }
  }

  async callback(req: Request, res: Response): Promise<Response> {
    try {
      const webhookSignature = req.headers["x-razorpay-signature"] as string;
      const body = req.body;

      // Validate webhook signature
      const isVerified = validateWebhookSignature(
        JSON.stringify(body),
        webhookSignature,
        CONFIG.RP_WEBHOOK_SECRET
      );

      if (!isVerified) {
        console.error("Webhook verification failed.");
        return res.status(200).send({ message: "Webhook not verified" });
      }

      const event = req.body.event;

      if (
        event.startsWith("order.") ||
        event.startsWith("payment_link.") ||
        event.startsWith("payment.")
      ) {
        await parseAndSaveEvent(req.body);
      }

      // const paymentLinkEntity = body.payload?.payment_link?.entity;
      // if (paymentLinkEntity) {
      //     const paymentId = paymentLinkEntity.id;
      //     const status = paymentLinkEntity.status;

      //     // Save or update payment details as needed
      //     console.log(`Payment Link ID: ${paymentId}, Status: ${status}`);
      // }

      return res
        .status(200)
        .send({ message: "Webhook processed successfully" });
    } catch (error: any) {
      console.error("Error processing webhook:", error);
      return res.status(200).send({ message: "Internal server error" });
    }
  }
  async createPaymentLink(
    paymentLinkRequest: PaymentLinkPayload
  ): Promise<PaymentLinks.RazorpayPaymentLink> {
    try {
      const paymentLink = await this.razorpay.paymentLink.create({
        amount: paymentLinkRequest.amount * 100, // Amount in paisa
        currency: "INR",
        description: paymentLinkRequest.description,
        customer: {
          name: paymentLinkRequest.customer.name,
          email: paymentLinkRequest.customer.email,
          contact: paymentLinkRequest.customer.contact,
        },
        notify: {
          sms: paymentLinkRequest.notify.sms,
          email: paymentLinkRequest.notify.email,
        },
        callback_url: CONFIG.RP_CALLBACK,
        callback_method: "get",
      });
      return paymentLink;
    } catch (error) {
      throw new Error(`Error creating payment link: ${error.message}`);
    }
  }
}
