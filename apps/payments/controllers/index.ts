import {
    CONTRACT_PAYMENT_STATUS,
    CONTRACT_STATUS,
    ContractPaymentDetails,
} from "apps/contracts/interface/Contract";
import {ContractRepo} from "apps/contracts/models/ContractRepo";
import {LeadRepo} from "apps/lead/models/lead";
import {PaymentLinkPayload} from "apps/razorpay/models/Razorpay";
import RepoProvider from "apps/RepoProvider";
import {CONFIG} from "config";
import {
    ERROR_MESSAGE,
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
} from "constants/response-messages";
import {NextFunction, Request, Response} from "express";
import {sendMail, sendResponse,} from "libraries";
import {
    PaymentReceivedMail
} from "static/views/email/get-templates/PaymentReceivedMail";

import Razorpay from "razorpay";
import {
    MakePaymentMail
} from "../../../static/views/email/get-templates/MakePaymentMail";
import {RPOrderTable} from "../../rp-order/models/RPOrderTable";
import {PendingOrderModel} from "../../pending-orders/models/PendingOrderTable";
import {parseAndSavePendingOrderToOrder} from "../../order/parser/parseOrder";
import {
    COMMISSION_PAID_STATUS, CommissionVoucherCreationAttributes,
    ICommissionEntity
} from "../../commission/model/CommissionEntityMappingTable";

import {validateWebhookSignature} from "razorpay/dist/utils/razorpay-utils";


const razorpayInstance = new Razorpay({
    key_id: CONFIG.RP_ID_PROD,
    key_secret: CONFIG.RP_SECRET_PROD,
});

export default class PaymentsController {
    static async callback(req: Request, res: Response, next: NextFunction) {
        const webhookSignature = req.headers["x-razorpay-signature"];
        if (!webhookSignature || typeof webhookSignature != 'string') {
            console.log("Webhook signature not found");
            return res.status(400)
                .send({message: "Webhook signature not found"});
        }
        const body = req.body;

        try {
            // Validate the webhook signature
            const isVerified = validateWebhookSignature(
                JSON.stringify(body),
                webhookSignature,
                CONFIG.RP_WEBHOOK_SECRET,
            );
            if (!isVerified) {
                console.log("Webhook not verified");
                return res.status(400).send({message: "Webhook not verified"});
            }

            if (body.payload && body.payload.payment_link &&
                body.payload.payment_link.entity) {
                const paymentId = body.payload.payment_link.entity.id;
                const status = body.payload.payment_link.entity.status;

                // Get contract details by paymentId
                const contractDetails = await new ContractRepo().getContractByPaymentId(
                    paymentId as string);
                if (!contractDetails) {
                    console.log("Contract not found for paymentId:", paymentId);
                    return res.status(404)
                        .send({message: "Contract not found"});
                }

                // Update contract payment details
                const paymentDetails: ContractPaymentDetails = {
                    paymentId: paymentId,
                    amount: 0,  // Assuming amount is not present in the
                                // payload, you can modify if needed
                    date: new Date(),
                    status: status,
                    additionalInfo: "",
                };
                contractDetails.payment.push(paymentDetails);

                // Update payment status
                await new ContractRepo().updatePaymentStatus(
                    contractDetails.id,
                    contractDetails.payment as unknown as ContractPaymentDetails[],
                    CONTRACT_STATUS.PAYMENT_RECEIVED,
                );

                // Send payment received email after success

                if (status === 'paid' || status === "order.paid" || status ===
                    "Paid") {
                    const mailDto = new PaymentReceivedMail().getPayload({},
                        contractDetails.leadId.email);
                    await sendMail(mailDto);
                }
                return res.status(200)
                    .send({message: "Webhook processed successfully"});

            } else if (body.payload && body.payload.order &&
                body.payload.order.entity &&
                body.payload.order.entity.status === "paid") {


                const rpResponse = await RPOrderTable.findOne(
                    {where: {id: body.payload.order.entity.id}});
                if (rpResponse) {
                    // @TODO @rajinder sir this is temporary
                    try {
                        const pendingOrderRes = await PendingOrderModel.findOne(
                            {
                                where: {paymentId: rpResponse.id}  // 'paymentId'
                                                                   // is the
                                                                   // column
                                                                   // you're
                                                                   // filtering
                                                                   // by
                            });
                        if (pendingOrderRes) {
                            const order = await parseAndSavePendingOrderToOrder(
                                pendingOrderRes.toJSON());
                            if (order) {
                                //todo  @sumeet sir

                                const franchiseModel = await RepoProvider.franchise.getById(
                                    order.franchise_id)

                                // Prepare commission mapping entries
                                const commissionEntries = franchiseModel.commissionMap.map(
                                    (commission: ICommissionEntity) => {
                                        const voucherCreationDto: CommissionVoucherCreationAttributes = {
                                            createdBy: 1, // system user - TT
                                            franchiseId: order.franchise_id,
                                            commissionId: commission.commissionId,
                                            organizationId: commission.organizationId,
                                            status: COMMISSION_PAID_STATUS.PENDING
                                        }
                                        return voucherCreationDto;
                                    });

                                // Create commission mappings
                                await RepoProvider.commissionRepo.createMapEntities(
                                    commissionEntries);
                            }
                        } else {
                            console.log(
                                'No pending order found for the provided paymentId');
                        }
                    }
                    catch (error) {
                        console.error('Error retrieving pending order:', error);
                    }

                }
            } else {
                return res.status(200)
                    .send({message: "Invalid payload structure"});
            }
        }
        catch (error) {
            console.error("Error processing webhook:", error);
            // In case of any error, send a generic error message
            return res.status(200).send({message: "Internal Server Error"});
        }
    }

    static async fetchPayment(req: Request, res: Response, next: NextFunction) {
        try {
            const {paymentId} = req.params;

            if (!paymentId) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Payment ID is required.",
                        ),
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
                            "Payment not found in Razorpay.",
                        ),
                    );
            }
            console.log(
                "Payment Details from Razorpay:",
                paymentDetailsFromRazorpay,
            );

            const paymentDetailsFromRepo =
                await new ContractRepo().getPaymentById(paymentId);
            if (!paymentDetailsFromRepo) {
                return res
                    .status(404)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Payment not found in local repository.",
                        ),
                    );
            }
            console.log(
                "Payment Details from Repository:",
                paymentDetailsFromRepo,
            );

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    "Payment details fetched successfully.",
                    {
                        paymentDetailsFromRazorpay: paymentDetailsFromRazorpay,
                        paymentDetailsFromRepo: paymentDetailsFromRepo,
                    },
                ),
            );
        }
        catch (err) {
            console.error("Error fetching payment details:", err);
            return res.status(500).send({message: err});
        }
    }

    static async generatePaymentLink(req: Request, res: Response) {
        try {
            const {contract_id} = req.body;

            if (!contract_id) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Contract ID is required.",
                        ),
                    );
            }

            console.log("#23223###", contract_id);

            const contractDetails = await new ContractRepo().get(contract_id);
            if (!contractDetails) {
                return res
                    .status(404)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Contract not found.",
                        ),
                    );
            }

            const leadDetails = await new LeadRepo().get(
                contractDetails.leadId.id,
            );

            if (!leadDetails) {
                return res
                    .status(404)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, "Lead not found."));
            }

            // const link = await createStandardPaymentLink({
            //     contract: contractDetails,
            //     lead: leadDetails,
            // });

            const paymentLinkPayload: PaymentLinkPayload = {
                amount: contractDetails.amount,
                customer: {
                    contact: leadDetails.phoneNumber,
                    email: leadDetails.email,
                    name: leadDetails.firstName + " " + leadDetails.lastName,
                },
                description: `${contractDetails.leadId}`,
                notify: {email: false, sms: false},
            };

            console.log("####", paymentLinkPayload);


            const link =
                await RepoProvider.razorpayRepo.createPaymentLink(
                    paymentLinkPayload,
                );

            if (!link) {
                return res
                    .status(500)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Failed to create payment link.",
                        ),
                    );
            }

            const paymentPayload: ContractPaymentDetails = {
                paymentId: link.id,
                amount: Number(link.amount) / 100,
                date: new Date(Number(link.created_at) * 1000),
                status: CONTRACT_PAYMENT_STATUS.PENDING,
                additionalInfo: link.description,
            };

            let contractPayment: ContractPaymentDetails[] = [];
            if (contractDetails.payment) {
                contractPayment = contractDetails.payment;
                contractPayment.push(paymentPayload);
            } else {
                contractPayment = [paymentPayload];
            }
            await new ContractRepo().updatePayment(
                contract_id,
                contractPayment,
                CONTRACT_STATUS.ACTIVE,
            );

            // try {
            //     const emailContent = getEmailTemplate(
            //         EMAIL_TEMPLATE.PAYMENT_REQUEST,
            //         {
            //             email: leadDetails.email,
            //             link: link.short_url,
            //         },
            //     );
            //
            //     const mailOptions = {
            //         to: leadDetails.email,
            //         subject: EMAIL_HEADING.PAYMENT_REQUEST,
            //         templateParams: {
            //             heading: EMAIL_HEADING.PAYMENT_REQUEST,
            //             description: emailContent,
            //         },
            //     };
            //
            //     await sendEmail(
            //         mailOptions.to,
            //         mailOptions.subject,
            //         mailOptions.templateParams,
            //     );
            // } catch (emailError) {
            //     console.error("Error sending email:", emailError);
            // }


            // @Harsh After sign agreement mail
            const mailDto = new MakePaymentMail().getPayload(
                {
                    btnLink: link.short_url
                },
                leadDetails.email,
            );
            await sendMail(mailDto);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        link,
                    ),
                );
        }
        catch (err) {
            console.error("Error generating payment link:", err);
            return res
                .status(500)
                .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }
}
