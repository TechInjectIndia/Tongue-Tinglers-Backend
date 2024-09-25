const Razorpay = require('razorpay');
import { NextFunction, Request, Response } from "express";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { sendResponse, createStandardPaymentLink, sendEmail, EMAIL_HEADING, getEmailTemplate, EMAIL_TEMPLATE } from "../../../libraries";
import { ContractRepo } from '../../contracts/models/ContractModel';
import { LeadRepo } from '../../lead/models/lead';
import { CONTRACT_PAYMENT_STATUS } from '../../../interfaces';
import { ContractPaymentDetails } from "../../../interfaces";
import { CONFIG } from '../../../config';

const razorpayInstance = new Razorpay({
    key_id: CONFIG.RP_ID_PROD,
    key_secret: CONFIG.RP_SECRET_PROD
});

export default class PaymentsController {
    static async webhook(req: Request, res: Response, next: NextFunction) {
        const receivedSignature = req.headers['x-razorpay-signature'];
        const webhookBody = JSON.stringify(req.body);

        const isVerified = razorpayInstance.utils.verifyWebhookSignature(webhookBody, receivedSignature, CONFIG.RP_WEBHOOK_SECRET);
        if (!isVerified) {
            return res.status(400).send('Invalid signature');
        }

        const event = req.body;

        switch (event.event) {
            case 'payment.captured':
                await this.handlePaymentCaptured(event, CONTRACT_PAYMENT_STATUS.SUCCESS);
                break;
            case 'payment.failed':
                await this.handlePaymentCaptured(event, CONTRACT_PAYMENT_STATUS.FAILED);
                break;
            default:
                console.log(`Unhandled event: ${event.event}`);
        }

        res.status(200).send('Webhook received and verified');
    }

    static async handlePaymentCaptured(event: any, status: any) {
        const paymentDetails = {
            paymentId: event.payload.payment.entity.id,
            amount: event.payload.payment.entity.amount / 100,
            date: new Date(event.payload.payment.entity.created * 1000),
            status: status,
            additionalInfo: event.payload.payment.entity.notes,
        };

        const paymentId = paymentDetails.paymentId;

        await new ContractRepo().updatePaymentStatus(paymentId, paymentDetails);
    }

    static async fetchPayment(req: Request, res: Response, next: NextFunction) {
        try {
            const { paymentId } = req.params;

            if (!paymentId) {
                return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, "Payment ID is required."));
            }

            const paymentDetailsFromRazorpay = await razorpayInstance.payments.fetch(paymentId);
            if (!paymentDetailsFromRazorpay) {
                return res.status(404).send(sendResponse(RESPONSE_TYPE.ERROR, "Payment not found in Razorpay."));
            }
            console.log('Payment Details from Razorpay:', paymentDetailsFromRazorpay);

            const paymentDetailsFromRepo = await new ContractRepo().getPaymentById(paymentId);
            if (!paymentDetailsFromRepo) {
                return res.status(404).send(sendResponse(RESPONSE_TYPE.ERROR, "Payment not found in local repository."));
            }
            console.log('Payment Details from Repository:', paymentDetailsFromRepo);

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, "Payment details fetched successfully.", {
                paymentDetailsFromRazorpay: paymentDetailsFromRazorpay,
                paymentDetailsFromRepo: paymentDetailsFromRepo
            }));

        } catch (err) {
            console.error("Error fetching payment details:", err);
            return res.status(500).send({ message: err });
        }
    }


    static async generatePaymentLink(req: Request, res: Response, next: NextFunction) {
        try {
            const { contract_id } = req.body;

            if (!contract_id) {
                return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, "Contract ID is required."));
            }

            const contractDetails = await new ContractRepo().get(contract_id);
            if (!contractDetails) {
                return res.status(404).send(sendResponse(RESPONSE_TYPE.ERROR, "Contract not found."));
            }

            const leadDetails = await new LeadRepo().get(contractDetails.leadId);
            if (!leadDetails) {
                return res.status(404).send(sendResponse(RESPONSE_TYPE.ERROR, "Lead not found."));
            }

            const link = await createStandardPaymentLink({ contract: contractDetails, lead: leadDetails });
            if (!link) {
                return res.status(500).send(sendResponse(RESPONSE_TYPE.ERROR, "Failed to create payment link."));
            }

            const paymentPayload: ContractPaymentDetails = {
                paymentId: link.id,
                amount: link.amount,
                date: new Date(link.created_at * 1000),
                status: CONTRACT_PAYMENT_STATUS.PENDING,
                additionalInfo: link.description,
            };

            await new ContractRepo().updatePayment(contract_id, paymentPayload);

            try {
                const emailContent = await getEmailTemplate(EMAIL_TEMPLATE.PAYMENT_REQUEST, {
                    email: leadDetails.email,
                    link: link.short_url
                });

                const mailOptions = {
                    to: leadDetails.email,
                    subject: EMAIL_HEADING.PAYMENT_REQUEST,
                    templateParams: {
                        heading: EMAIL_HEADING.PAYMENT_REQUEST,
                        description: emailContent
                    }
                };

                await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.templateParams);
            } catch (emailError) {
                console.error("Error sending email:", emailError);
            }

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED, link));

        } catch (err) {
            console.error("Error generating payment link:", err);
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }
}