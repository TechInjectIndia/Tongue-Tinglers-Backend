import { Resend } from "resend";
import { CONFIG } from "../config";
import ejs from "ejs";
import path from "path";
import { DTO, getSuccessDTO, getUnhandledErrorDTO } from "apps/common/models/DTO";
import { AllMailOptions } from "static/views/email/models/MailOptions";
import MailProvider from "static/views/email/provider/MailProvider"

const resend = new Resend(CONFIG.RESEND_API_KEY);

export const EMAIL_HEADING = {
    WELCOME_ADMIN_USER: "Welcome to Tongue Tinglers",
    NEW_FRANCHISE_CREATED: "New Franchise Created",
    PROSPECT_GENERATED: "Prospect Generated",
    FOLLOW_UP_REMINDER: "Follow-Up Reminder",
    LEAD_GENERATION: "Lead Generation",
    ORDER_CONFIRMATION: "Order Confirmation",
    PASSWORD_RESET: "Password Reset",
    PAYMENT_CONFIRMATION: "Payment Confirmation",
    PAYMENT_RECEIPT: "Payment Receipt",
    PAYMENT_REMINDER: "Payment Reminder",
    REFERRAL_NOTIFICATION: "Referral Notification",
    PAYMENT_REQUEST: "Payment Request",
};

export const EMAIL_TEMPLATE = {
    WELCOME_ADMIN_USER: "welcomeAdminUser",
    LEAD_CONVERTED: "convertLeadToFranchisee",
    NEW_FRANCHISE_CREATED: "newFranchiseNotification",
    FOLLOW_UP_REMINDER: "getTodayFollowUps",
    LEAD_GENERATION: "leadGenerationTemplate",
    ORDER_CONFIRMATION: "orderConfirmationTemplate",
    PASSWORD_RESET: "passwordResetTemplate",
    PAYMENT_CONFIRMATION: "paymentConfirmationTemplate",
    PAYMENT_RECEIPT: "paymentReceiptTemplate",
    PAYMENT_REMINDER: "paymentReminderTemplate",
    PAYMENT_REQUEST: "paymentRequest",
    REFERRAL_NOTIFICATION: "referralNotificationTemplate",

    WELCOME: "welcome",
    FINALIZE: "finalize",
    SIGN_AGREEMENT: "signAgreement",
    MAKE_PAYMENT: "makePayment",
    PAYMENT_RECEIVED: "paymentReceived",
    CONGRATULATIONS: "congratulations",
};

const defaultParams = {
    logo: "Tongue Tinglers",
    about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s",
    address: "ABC street, 123, US",
    phone: "+1234567890",
};

export const sendEmail = async (
    to: string,
    subject: string,
    templateParams: {
        heading: string;
        description: string;
    },
) => {
    const paramsData = templateParams
        ? { ...templateParams, ...defaultParams }
        : { ...defaultParams };
    await ejs
        .renderFile(
            path.join(__dirname, "../static/views/email/index.ejs"),
            paramsData,
        )
        .then((result) => {
            resend.emails
                .send({
                    from: "Nitesh@techinject.co.in",
                    to,
                    subject,
                    html: result,
                })
                .then((result) => {
                    console.log(">>>>>>>> res", result);
                })
                .catch((err) => {
                    console.log(">>>>>>>>> err", err);
                });
        })
        .catch((err) => {
            console.log("Error loading email", err);
        });
};

export const sendEmailFromRequest = async (
    to: string,
    subject: string,
    body: string,
    files?: Express.Multer.File[], // Array of files
    filePaths?: { path: string; name: string }[], // Array of file paths and names
) => {
    try {
        // Prepare the email options
        const emailOptions: any = {
            from: "Nitesh@techinject.co.in",
            to,
            subject,
            html: body,
        };

        if (files && files.length > 0) {
            emailOptions.attachments = files.map((file) => ({
                filename: file.originalname,
                content: file.buffer,
                contentType: file.mimetype,
            }));
        }

        if (filePaths) {
            if (filePaths && filePaths.length > 0) {
                const filePathAttachments = filePaths.map((filePath) => ({
                    path: filePath.path,
                    filename: filePath.name,
                }));

                emailOptions.attachments = [
                    ...(emailOptions.attachments || []),
                    ...filePathAttachments,
                ];
            }
        }
        const result = await resend.emails.send(emailOptions);
        if (result.error) {
            console.error("Error sending email:", result.error);
            throw result.error; // Propagate the error for further handling
        }
        console.log("Email sent:", result);
        return result;
    } catch (err) {
        console.error("Error sending email:", err);
        throw err; // Propagate the error for further handling
    }
};

export const getEmailTemplate = (template: string, params?: any): string => {
    const data = ejs.renderFile<string>(
        path.join(__dirname, `../static/views/email/${template}.ejs`),
        params ?? {},
    );
    return data;
};

export const sendMail = async (mailOptionsDto: DTO<AllMailOptions>) => {
    if (!mailOptionsDto.success) {
        return getUnhandledErrorDTO(mailOptionsDto.message, mailOptionsDto.message);
    }

    const mailData = mailOptionsDto.data;
    console.log(mailData);

    try {
        let res: DTO<boolean>;
        if (mailData.react) {
            console.log("react");

            res = await MailProvider.getResendController().sendMail(mailData);
        } else if (mailData.html) {
            console.log("nodemailer");

            // res = await MailProvider.getNodemailerController().sendMail(mailData);
        } else {
            return getUnhandledErrorDTO(
                "Invalid mail options: neither 'react' nor 'html' provided."
            );
        }
        return handleSendMailResponse(res);
    } catch (error: any) {
        return getUnhandledErrorDTO("internal Error", error.message);
    }
};

const handleSendMailResponse = (res: DTO<boolean>) => {
    if (res.success) {
        return getSuccessDTO({ code: res.code, message: res.data });
    } else {
        return getSuccessDTO({ code: res.code, message: `${res.message}` });
    }
};
