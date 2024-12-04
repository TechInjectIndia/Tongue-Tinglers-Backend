import {
    PaymentLinkPayload,
    RazorpayPaymentLinkResponse,
} from "../models/Razorpay";
import { CONFIG } from "../../../config";
import { IRazorpayRepo } from "./IRazorpayRepo";
import { btoa } from "node:buffer";


export class RazorpayRepo implements IRazorpayRepo {
    private readonly apiKey: string = CONFIG.RP_ID_PROD;
    private readonly apiSecret: string = CONFIG.RP_SECRET_PROD;


    private async makeRequest(endpoint: string, method: string, body?: any) {
        const url = `https://api.razorpay.com/v1${endpoint}`;
        const options: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(`${this.apiKey}:${this.apiSecret}`)}`,
            },
            body: body ? JSON.stringify(body) : null,
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Razorpay API error: ${response.statusText}`);
        }

        return await response.json();
    }

    // Method to create a payment link
    public async createPaymentLink(paymentLinkRequest: PaymentLinkPayload): Promise<RazorpayPaymentLinkResponse> {
        return this.makeRequest("/payment_links", "POST", paymentLinkRequest);
    }

    // Method to fetch a payment link by ID
    public async getPaymentLink(id: string): Promise<RazorpayPaymentLinkResponse> {
        return this.makeRequest(`/payment_links/${id}`, "GET");
    }

    // Method to fetch all payment links
    public async getAllPaymentLinks(): Promise<RazorpayPaymentLinkResponse[]> {
        return this.makeRequest("/payment_links", "GET");
    }

    // Method to fetch payment details
    public async getPaymentDetails(paymentId: string): Promise<any> {
        return this.makeRequest(`/payments/${paymentId}`, "GET");
    }

    // Method to cancel a payment link
    public async cancelPaymentLink(id: string): Promise<any> {
        return this.makeRequest(`/payment_links/${id}/cancel`, "POST");
    }

    // Method to generate a refund
    public async generateRefund(paymentId: string, amount: number): Promise<any> {
        const refundRequest = { amount };
        return this.makeRequest(`/payments/${paymentId}/refund`, "POST", refundRequest);
    }

    createRazorpayOrder(orderId: string, amount: number): Promise<any> {
        return Promise.resolve(undefined);
    }


}

