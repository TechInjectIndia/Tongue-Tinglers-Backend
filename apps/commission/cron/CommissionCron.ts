import {Op} from "sequelize";
import cron from "node-cron";
import axios from "axios";
import {CommissionVoucherModel} from "../model/CommissionVoucherTable";
import {
    COMMISSION_PAID_STATUS,
    CommissionEntityMappingModel
} from "../model/CommissionEntityMappingTable";
import {OrganizationModel} from "apps/organization/models/OrganizationTable";
import {
    CommissionDetails,
    CommissionType,
    OrganizationPaymentDetails
} from "../interface/Commission";
import {CommissionTable} from "../model/CommmisionTable";
import {BankDetails} from "../../organization/interface/organization";

let commissionCronJob = null;
const key_id = process.env.ENVIRONMENT === "PROD"
    ? process.env.RAZORPAY_KEY_ID_PROD
    : process.env.RAZORPAY_KEY_ID_DEV;

const key_secret = process.env.ENVIRONMENT === "PROD"
    ? process.env.RAZORPAY_KEY_SECRET_PROD
    : process.env.RAZORPAY_KEY_SECRET_DEV;

class CommissionCron {
    data: CommissionDetails[] = [];

    async getCommissionStatusData(): Promise<OrganizationPaymentDetails[]> {

        // const frequency = 10;
        // const today = new Date();
        // today.setHours(0, 0, 0, 0);

        // const daysBack = new Date(today);
        // daysBack.setDate(today.getDate() - frequency);
        try {
            this.data = await CommissionVoucherModel.findAll({
                where: {
                    status: {[Op.notIn]: ["hold", "paid"]},
                    // createdAt: { [Op.lte]: daysBack.toISOString() },
                },
                include: [
                    {
                        model: CommissionEntityMappingModel,
                        as: "commissionEntity",
                        where: {
                            id: {[Op.ne]: null},
                        },
                        include: [
                            {
                                model: CommissionTable,
                                as: "commission",
                                where: {
                                    type: CommissionType.PERCENTAGE,
                                },
                            },
                        ],
                    },
                ],
            }) as unknown as CommissionDetails[];

            if (!this.data.length) {
                console.log("No pending payment");
                return [];
            }
            const {
                organizationAmount,
                organizationDetails
            } = await this.getFormatedData()

            const finalDetails: OrganizationPaymentDetails[] = organizationDetails.map(
                (item) => {
                    return {
                        organizationId: item.id,
                        name: item.contactPersonName,
                        amount: organizationAmount[item.id].amount,
                        email: item.contactEmail,
                        phone: item.contactNumber,
                        account_number: item.bankAccountNumber,
                        ifsc: item.bankIFSCCode,
                    }
                })
            if (!finalDetails.length) {
                console.log("No pending payment");
                return [];
            }
            return finalDetails;
        }
        catch (error) {
            console.error("Error fetching payment in cron job:", error);
            return [];
        }
    }

    async getFormatedData() {

        const organizationAmount: {
            [key: string]: { organizationId: number; amount: number, }
        } = {};

        await Promise.all(this.data.map(async (item) => {

            const organizationId = item.commissionEntity.organizationId;
            const value = item.value;

            if (!organizationAmount[organizationId]) {
                organizationAmount[organizationId] = {
                    organizationId,
                    amount: value
                };
            } else {
                organizationAmount[organizationId].amount += value;

            }
        }))

        const organizationDetails: OrganizationModel[] = await OrganizationModel.findAll(
            {where: {id: Object.keys(organizationAmount)}});

        return {organizationAmount, organizationDetails}
    }

    async startCron(cronTime: string) {
        try {
            if (commissionCronJob) {
                console.log("Stopping the previous payment cron job...");
                commissionCronJob.stop();
            }

            commissionCronJob = cron.schedule(
                cronTime,
                async () => {
                    console.log(
                        `Running scheduled tasks for payment at ${cronTime}...`,
                    );
                    const customerPaymentDetails: OrganizationPaymentDetails[] = await this.getCommissionStatusData();

                    if (!customerPaymentDetails.length) {
                        console.log("No Customer Payment Details to process.");
                        return;
                    }
                    for (const data1 of customerPaymentDetails) {
                        await this.processPayment(data1);
                    }

                },
                {
                    timezone: "Asia/Kolkata",
                },
            );

            console.log(
                `New cron job for payment created with schedule: ${cronTime}`,
            );
        }
        catch (error) {
            console.error("Error starting cron job:", error);
        }
    }

    async getExistingContact(email: string, phone: string) {
        const response = await axios.get(
            "https://api.razorpay.com/v1/contacts",
            {
                auth: {username: key_id, password: key_secret},
            }
        );

        // Check if contact exists
        const existingContact = response.data.items.find(
            (contact: any) => contact.email === email || contact.contact ===
                phone
        );

        return existingContact ? existingContact.id : null;
    }


    async createOrGetContact(customerName: string, email: string,
        phone: string) {
        const existingContactId = await this.getExistingContact(email, phone);

        if (existingContactId) {
            console.log("Contact already exists:", existingContactId);
            return existingContactId; // Return existing contact ID
        }

        // Create a new contact
        const response = await axios.post(
            "https://api.razorpay.com/v1/contacts",
            {
                name: customerName,
                email: email,
                contact: phone,
                type: "customer",
            },
            {
                auth: {username: key_id, password: key_secret},
            }
        );

        console.log("New contact created:", response.data.id);
        return response.data.id; // Return new contact ID
    }

    // Function to create fund account for the contact
    async createFundAccount(contactId: string, bankAccount: BankDetails) {
        const response = await axios.post(
            "https://api.razorpay.com/v1/fund_accounts",
            {
                contact_id: contactId,
                account_type: "bank_account",
                bank_account: {
                    name: bankAccount.bankName,
                    ifsc: bankAccount.bankIFSCCode,
                    account_number: bankAccount.bankAccountNumber,
                },
            },
            {
                auth: {username: key_id, password: key_secret},
            }
        );

        console.log("Fund account created:", response.data.id);
        return response.data.id; // Return fund account ID
    }

    // Function to initiate payment transfer
    // todo fix hardcoding
    async transferToCustomer(fundAccountId: string, amount: number) {
        const response = await axios.post(
            "https://api.razorpay.com/v1/payouts",
            {
                account_number: "2323230085940196", // Razorpay virtual account
                                                    // number
                fund_account_id: fundAccountId,
                amount: amount * 100, // Amount in paise (₹100 = 10000)
                currency: "INR",
                mode: "NEFT", // Other modes: NEFT, UPI, RTGS
                purpose: "payout",
                queue_if_low_balance: true, // If insufficient balance, queue it
                reference_id: "txn_123456",
                narration: "Customer payment",
            },
            {
                auth: {username: key_id, password: key_secret},
            }
        );

        console.log("Payout successful:", response.data.id);
        return response.data.id; // Return payout ID
    }

    // **Main function to handle the payment process**
    async processPayment(customerPaymentDetails: OrganizationPaymentDetails) {
        try {
            // Step 1: Check or create contact
            const contactId = await this.createOrGetContact(
                customerPaymentDetails.name,
                customerPaymentDetails.email,
                customerPaymentDetails.phone
            );

            // Step 2: Create fund account
            const fundAccountId = await this.createFundAccount(contactId, {
                bankName: customerPaymentDetails.name,
                bankAccountNumber: customerPaymentDetails.account_number,
                bankIFSCCode: customerPaymentDetails.ifsc
            });

            // Step 3: Transfer payment
            const payoutId = await this.transferToCustomer(fundAccountId,
                customerPaymentDetails.amount);

            console.log(" Payment processed successfully! Payout ID:",
                payoutId);

            await this.updatePaymentStatus(this.data,
                customerPaymentDetails.organizationId);
        }
        catch (error) {
            console.error(" Payment failed:",
                error.response?.data || error.message);
        }
    }

    async updatePaymentStatus(
        data: CommissionDetails[],
        organizationId: number
    ): Promise<void> {
        // Filter data to get only items related to the given organizationId
        const paymentUpdateData = data.filter(
            (item) => item.commissionEntity?.organizationId === organizationId
        );

        // Ensure there is data to process
        if (!paymentUpdateData.length) {
            console.log(
                `No payment data found for organizationId: ${organizationId}`);
            return;
        }

        // Update status for all filtered items
        await Promise.all(
            paymentUpdateData.map(async (item) => {
                try {
                    await CommissionVoucherModel.update(
                        {
                            status: COMMISSION_PAID_STATUS.PAID,
                        },
                        {
                            where: {
                                id: item.id,
                            },
                        }
                    );
                    console.log(
                        `Payment status updated for item ID: ${item.id}`);
                }
                catch (error) {
                    console.error(
                        `Failed to update payment status for item ID: ${item.id}, Error:`,
                        error
                    );
                }
            })
        );

        console.log(
            `Payment status updated for organizationId: ${organizationId}`);
    }
}


export default new CommissionCron();
