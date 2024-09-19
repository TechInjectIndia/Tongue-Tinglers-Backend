const Razorpay = require('razorpay');
import { CONFIG } from '../config';
import {
    TContract,
    TLead
} from "../types";

const instance = new Razorpay({
    key_id: CONFIG.RP_ID_PROD,
    key_secret: CONFIG.RP_SECRET_PROD
});

export const createStandardPaymentLink = async (data: { 'contract': TContract, 'lead': TLead }) => {
    try {
        const response = await instance.paymentLink.create({
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
            callback_url: "https://example-callback-url.com/",
            callback_method: "post"
        });

        return response;
        // return response{
        //     callback_url: response?.callback_url,
        //     short_url: response?.short_url
        // };
    } catch (err) {
        return err;
    }
}
