// const Razorpay = require('razorpay');
// import { CONFIG } from '../config';
// import {
//     TContract,
// } from "../types";
//
// import {
//     ILead
// } from "../interfaces";
//
// const razorpayInstance = new Razorpay({
//     key_id: CONFIG.RP_ID_PROD,
//     key_secret: CONFIG.RP_SECRET_PROD
// });
//
// export const createStandardPaymentLink = async (data: { 'contract': TContract, 'lead': ILead }) => {
//     try {
//         const response = await razorpayInstance.paymentLink.create({
//             amount: data.contract.amount,
//             currency: "INR",
//             accept_partial: true,
//             first_min_partial_amount: 100,
//             description: data.contract.additionalInfo,
//             customer: {
//                 name: `${data.lead.firstName} ${data.lead.lastName}`,
//                 email: data.lead.email,
//                 contact: data.lead.phoneNumber
//             },
//             notify: {
//                 sms: false,
//                 email: false
//             },
//             reminder_enable: false,
//             notes: {
//                 policy_name: "Tongue Tingler"
//             },
//             callback_url: CONFIG.RP_CALLBACK,
//             callback_method: "get"
//         });
//
//         return response;
//     } catch (err) {
//         console.error("Error creating payment link:", err);
//         return new Error("Failed to create payment link");
//     }
// }
//
// export const createStandardPaymentLinkForOrders = async (data: { cart: any, franchise: any }) => {
//     try {
//         const callbackUrl = `${CONFIG.FRONTEND_URL}/${CONFIG.RP_CALLBACK_ORDERS}`;
//         console.log("Callback URL:", callbackUrl); // Log the URL to verify
//
//         const response = await razorpayInstance.paymentLink.create({
//             amount: Math.round(data.cart.totalAmount * 100),
//             currency: "INR",
//             accept_partial: true,
//             first_min_partial_amount: 100,
//             description: "Ecommerce-order",
//             customer: {
//                 name: `${data.franchise.name}`,
//                 email: data.franchise.contactEmail,
//                 contact: data.franchise.contactNumber
//             },
//             notify: {
//                 sms: false,
//                 email: false
//             },
//             reminder_enable: false,
//             notes: {
//                 policy_name: "Tongue Tingler"
//             },
//             callback_url: callbackUrl,
//             callback_method: "get"
//         });
//
//         return response;
//     } catch (err) {
//         console.error("Error creating payment link:", err);
//         return new Error("Failed to create payment link");
//     }
// }
//
// export const CreatePaymentIntentWithRazorpay = async (data: any) => {
//     try {
//         // Razorpay order creation payload
//         const paymentIntentPayload = {
//             amount: Math.round(data.cart.totalAmount * 100),
//             currency: "INR",
//             payment_capture: 1,
//             receipt: `order_rcpt_${Date.now()}`,
//             notes: {
//                 policy_name: "Tongue Tingler"
//             },
//         };
//
//         // Create a payment intent (order) using Razorpay Orders API
//         const paymentIntent = await razorpayInstance.orders.create(paymentIntentPayload);
//
//         // Check if payment intent was created successfully
//         if (!paymentIntent || !paymentIntent.id) {
//             return {
//                 status: 500,
//                 message: "Failed to create payment intent."
//             };
//         }
//
//         return {
//             status: 200,
//             message: "Payment intent created successfully.",
//             data: { paymentIntentId: paymentIntent.id }
//         };
//     } catch (err) {
//         console.error("Error creating payment intent:", err);
//         return {
//             status: 500,
//             message: "Failed to create payment intent."
//         };
//     }
// };
