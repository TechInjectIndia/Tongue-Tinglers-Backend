import {
    TransactionModel,
} from "../../../database/schema/payment-transaction/PaymentTransactionModel";
import { ContractRepo } from "../../contracts/models/ContractRepo";
import {
    CONTRACT_PAYMENT_STATUS, CONTRACT_STATUS,
    ContractPaymentDetails,
} from "../../../interfaces";

async function parseAndSaveEvent(eventPayload: any) {
    const { event, payload } = eventPayload;

    console.log(payload);

    interface FailedPayload {
        error_description: string | null;
        error_source: string | null;
        error_step: string | null;
        error_reason: string | null;
    }

    let transactionData: any = {};

    // For "order" events, e.g., order.paid, order.created
    if (event.startsWith("order.")) {
        const order = payload?.order?.entity; // Access the 'entity' object of the order

        if (order) {
            transactionData = {
                transactionId: order?.id || null,
                description: order.description || null,
                entity: "order",
                status: order?.status || null,
                amount: order?.amount || null,
                currency: order?.currency || null,
                failureReason: order?.failure_reason || null, // Extract failure reason if available
                createdAt: order?.created_at ? new Date(order.created_at * 1000) : null, // Convert UNIX timestamp
            };
        }
    }
    // For "payment_link" events, e.g., payment_link.paid
    else if (event.startsWith("payment_link.")) {
        const paymentLink = payload?.payment_link?.entity;

        if (paymentLink) {
            transactionData = {
                transactionId: paymentLink?.id || null,
                description: paymentLink.description || null,
                entity: "payment_link",
                status: paymentLink?.status || null,
                amount: paymentLink?.amount || null,
                currency: paymentLink?.currency || null,
                failureReason: paymentLink?.failure_reason || null, // Extract failure reason if available
                createdAt: paymentLink?.created_at
                    ? new Date(paymentLink.created_at * 1000)
                    : null,
            };
        }
    }
    // For "payment" events, including "payment.failed"
    else if (event.startsWith("payment.")) {
        const payment = payload?.payment?.entity;

        if (payment) {
            // Special handling for failed payments
            if (event === "payment.failed") {
                transactionData = {
                    description: payment.description || null,
                    transactionId: payment?.id || null,
                    entity: "payment",
                    status: "failed", // Explicitly mark the status as "failed"
                    amount: payment?.amount || null,
                    currency: payment?.currency || null,
                    failureReason: payment?.failure_reason || null, // Extract failure reason if available
                    createdAt: payment?.created_at
                        ? new Date(payment.created_at * 1000)
                        : null,
                };
            } else {
                // Handle other payment events (e.g., payment.authorized, payment.captured)
                transactionData = {
                    transactionId: payment?.id || null,
                    description: payment.description || null,
                    entity: "payment",
                    status: payment?.status || null,
                    amount: payment?.amount || null,
                    currency: payment?.currency || null,
                    failureReason: payment?.failure_reason || null, // Extract failure reason if available
                    createdAt: payment?.created_at
                        ? new Date(payment.created_at * 1000)
                        : null,
                };
            }
        }
    }


    if (transactionData.description && transactionData.description.includes("#")) {
        transactionData.description = transactionData.description.replace("#", "plink_");
        const res = await new ContractRepo().getContractByPaymentId(
            transactionData.description,
        );
        if (res) {
            const paymentDetails: ContractPaymentDetails = {
                paymentId: transactionData.description,
                amount: transactionData.amount,
                date: new Date(),
                status: transactionData.status as unknown as CONTRACT_PAYMENT_STATUS,
                additionalInfo: "",
            };
            res.payment.push(paymentDetails);

            console.log(paymentDetails);
            console.log(transactionData);

            let contractStatus = res.status;

            if (res.status.toLowerCase() === "paid") {
                contractStatus = CONTRACT_STATUS.PAYMENT_RECEIVED;
            }
            await new ContractRepo().updatePaymentStatus(
                res.id as number,
                res.payment as unknown as ContractPaymentDetails[],
                contractStatus,
            );
        }

    }
    await TransactionModel.create(transactionData);

    // Save the transaction data to your transactionTable
    // await saveTransaction(transactionData);
}

export { parseAndSaveEvent };
