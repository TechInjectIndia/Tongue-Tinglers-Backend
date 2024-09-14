const Razorpay = require('razorpay');
import { CONFIG } from '../config';

const instance = new Razorpay({
    key_id: CONFIG.RP_ID_PROD,
    key_secret: CONFIG.RP_SECRET_PROD
});

export const createStandardPaymentLink = async (contract_id: number) => {
    const response = await instance.paymentLink.create({
        amount: 500,
        currency: "INR",
        accept_partial: true,
        first_min_partial_amount: 100,
        description: "For XYZ purpose",
        customer: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "+919000090000"
        },
        notify: {
            sms: false,
            email: false
        },
        reminder_enable: false,
        notes: {
            policy_name: "Test request"
        },
        callback_url: "https://example-callback-url.com/",
        callback_method: "get"
    });
    
    return {
        callback_url: response?.callback_url,
        short_url: response?.short_url
    };
}
