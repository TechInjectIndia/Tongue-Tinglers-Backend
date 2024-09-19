const Razorpay = require('razorpay');
import { CONFIG } from '../config';
import {
    TContract,
    TLead
} from "../types";

const razorpayInstance = new Razorpay({
    key_id: CONFIG.RP_ID_PROD,
    key_secret: CONFIG.RP_SECRET_PROD
});

export const createStandardPaymentLink = async (data: { 'contract': TContract, 'lead': TLead }) => {
    try {
        const response = await razorpayInstance.paymentLink.create({
            amount: data.contract.amount,
            currency: "INR",
            accept_partial: true,
            first_min_partial_amount: 100,
            description: data.contract.additionalInfo,
            customer: {
                name: `${data.lead.firstName} ${data.lead.lastName}`,
                email: data.lead.email,
                contact: data.lead.phoneNumber
            },
            notify: {
                sms: false,
                email: false
            },
            reminder_enable: false,
            notes: {
                policy_name: "Tongue Tingler"
            },
            callback_url: CONFIG.RP_CALLBACK,
            callback_method: "get"
        });

        return response;
    } catch (err) {
        console.error("Error creating payment link:", err);
        throw new Error("Failed to create payment link");
    }
}
