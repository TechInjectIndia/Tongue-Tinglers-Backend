const Razorpay = require("razorpay");
import { NextFunction, Request, Response } from "express";
import {
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
} from "../../../constants";
import {
    sendResponse,
    createStandardPaymentLink,
    sendEmail,
    EMAIL_HEADING,
    getEmailTemplate,
    EMAIL_TEMPLATE,
} from "../../../libraries";
import { ContractRepo } from "../../contracts/models/ContractModel";
import { LeadRepo } from "../../lead/models/lead";
import { CONTRACT_PAYMENT_STATUS } from "../../../interfaces";
import { ContractPaymentDetails } from "../../../interfaces";
import { CONFIG } from "../../../config";
const {
    validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

const razorpayInstance = new Razorpay({
    key_id: CONFIG.RP_ID_PROD,
    key_secret: CONFIG.RP_SECRET_PROD,
});

export default class PaymentsController {
    static async callback(req: Request, res: Response, next: NextFunction) {
        const webhookSignature = req.headers["x-razorpay-signature"];
        const body = req.body;
        const isVerified = validateWebhookSignature(
            JSON.stringify(body),
            webhookSignature,
            CONFIG.RP_WEBHOOK_SECRET
        );
        if (isVerified) {
            if (
                body.payload &&
                body.payload.payment_link &&
                body.payload.payment_link.entity
            ) {
                const paymentId = body.payload.payment_link.entity.id;
                const status = body.payload.payment_link.entity.status;
                const contractDetails =
                    await new ContractRepo().getContractByPaymentId(
                        paymentId as string
                    );
                if (contractDetails) {
                    const paymentDetails: ContractPaymentDetails = {
                        paymentId: paymentId,
                        amount: body.payload.payment_link.entity.amount,
                        date: new Date(),
                        status: status,
                        additionalInfo: "",
                    };
                    contractDetails.payment.push(paymentDetails);
                    await new ContractRepo().updatePaymentStatus(
                        contractDetails.id,
                        contractDetails.payment as unknown as ContractPaymentDetails[]
                    );
                }
            }
            return res.status(200).send({ message: "Webhook Done" });
        } else {
            console.log("Webhook not verified");
            return res.status(200).send({ message: "Webhook not verified" });
        }
    }

    static async fetchPayment(req: Request, res: Response, next: NextFunction) {
        try {
            const { paymentId } = req.params;

            if (!paymentId) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Payment ID is required."
                        )
                    );
            }

            const paymentDetailsFromRazorpay =
                await razorpayInstance.payments.fetch(paymentId);
            if (!paymentDetailsFromRazorpay) {
                return res
                    .status(404)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Payment not found in Razorpay."
                        )
                    );
            }
            console.log(
                "Payment Details from Razorpay:",
                paymentDetailsFromRazorpay
            );

            const paymentDetailsFromRepo =
                await new ContractRepo().getPaymentById(paymentId);
            if (!paymentDetailsFromRepo) {
                return res
                    .status(404)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Payment not found in local repository."
                        )
                    );
            }
            console.log(
                "Payment Details from Repository:",
                paymentDetailsFromRepo
            );

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    "Payment details fetched successfully.",
                    {
                        paymentDetailsFromRazorpay: paymentDetailsFromRazorpay,
                        paymentDetailsFromRepo: paymentDetailsFromRepo,
                    }
                )
            );
        } catch (err) {
            console.error("Error fetching payment details:", err);
            return res.status(500).send({ message: err });
        }
    }

    static async generatePaymentLink(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { contract_id } = req.body;

            if (!contract_id) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Contract ID is required."
                        )
                    );
            }

            const contractDetails = await new ContractRepo().get(contract_id);
            if (!contractDetails) {
                return res
                    .status(404)
                    .send(
                        sendResponse(RESPONSE_TYPE.ERROR, "Contract not found.")
                    );
            }

            const leadDetails = await new LeadRepo().get(
                contractDetails.leadId
            );
            if (!leadDetails) {
                return res
                    .status(404)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, "Lead not found."));
            }

            const link = await createStandardPaymentLink({
                contract: contractDetails,
                lead: leadDetails,
            });
            if (!link) {
                return res
                    .status(500)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Failed to create payment link."
                        )
                    );
            }

            const paymentPayload: ContractPaymentDetails = {
                paymentId: link.id,
                amount: link.amount,
                date: new Date(link.created_at * 1000),
                status: CONTRACT_PAYMENT_STATUS.PENDING,
                additionalInfo: link.description,
            };

            await new ContractRepo().updatePayment(contract_id, [
                paymentPayload,
            ]);

            try {
                const emailContent = await getEmailTemplate(
                    EMAIL_TEMPLATE.PAYMENT_REQUEST,
                    {
                        email: leadDetails.email,
                        link: link.short_url,
                    }
                );

                const mailOptions = {
                    to: leadDetails.email,
                    subject: EMAIL_HEADING.PAYMENT_REQUEST,
                    templateParams: {
                        heading: EMAIL_HEADING.PAYMENT_REQUEST,
                        description: emailContent,
                    },
                };

                await sendEmail(
                    mailOptions.to,
                    mailOptions.subject,
                    mailOptions.templateParams
                );
            } catch (emailError) {
                console.error("Error sending email:", emailError);
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        link
                    )
                );
        } catch (err) {
            console.error("Error generating payment link:", err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }
}
