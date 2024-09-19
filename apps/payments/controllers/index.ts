const Razorpay = require('razorpay');
import { NextFunction, Request, Response } from "express";
import { sendResponse, createStandardPaymentLink } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
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

        const contractId = event.payload.payment.entity.notes.contract_id;

        await new ContractRepo().updatePayment(contractId, paymentDetails);
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

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED, link));

        } catch (err) {
            console.error("Error generating payment link:", err);
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }
}