import { Resend } from 'resend';
import { CONFIG } from '../config';
const path = require("path");
const ejs = require("ejs");

const resend = new Resend(CONFIG.RESEND_API_KEY);

export const EMAIL_HEADING = {
    WELCOME_ADMIN_USER: 'Welcome to Tongue Tinglers',
    NEW_FRANCHISE_CREATED: "New Franchise Created",
    FOLLOW_UP_REMINDER: "Follow-Up Reminder",
    LEAD_GENERATION: 'Lead Generation',
    ORDER_CONFIRMATION: 'Order Confirmation',
    PASSWORD_RESET: 'Password Reset',
    PAYMENT_CONFIRMATION: 'Payment Confirmation',
    PAYMENT_RECEIPT: 'Payment Receipt',
    PAYMENT_REMINDER: 'Payment Reminder',
    REFERRAL_NOTIFICATION: 'Referral Notification',
    PAYMENT_REQUEST: 'Payment Request',
};

export const EMAIL_TEMPLATE = {
    WELCOME_ADMIN_USER: 'welcomeAdminUser',
    LEAD_CONVERTED: "convertLeadToFranchisee",
    NEW_FRANCHISE_CREATED: "newFranchiseNotification",
    FOLLOW_UP_REMINDER: "getTodayFollowUps",
    LEAD_GENERATION: 'leadGenerationTemplate',
    ORDER_CONFIRMATION: 'orderConfirmationTemplate',
    PASSWORD_RESET: 'passwordResetTemplate',
    PAYMENT_CONFIRMATION: 'paymentConfirmationTemplate',
    PAYMENT_RECEIPT: 'paymentReceiptTemplate',
    PAYMENT_REMINDER: 'paymentReminderTemplate',
    PAYMENT_REQUEST: 'paymentRequest',
    REFERRAL_NOTIFICATION: 'referralNotificationTemplate',
};

const defaultParams = {
    logo: 'Tongue Tinglers',
    about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    address: 'ABC street, 123, US',
    phone: '+1234567890',
}

export const sendEmail = async (to: string, subject: string, templateParams: {
    heading: string,
    description: string
}) => {
    const paramsData = templateParams ? { ...templateParams, ...defaultParams } : { ...defaultParams };
    await ejs.renderFile(path.join(__dirname, "../static/views/email/index.ejs"), paramsData).then((result) => {
        resend.emails.send({
            from: 'Nitesh@techinject.co.in',
            to,
            subject,
            html: result
        }).then((result) => {
            console.log('>>>>>>>> res', result) 
        }).catch((err) => {
            console.log('>>>>>>>>> err', err)
        });
    }).catch((err) => {
        console.log('Error loading email', err);
    });
}

export const getEmailTemplate = async (template: string, params?: any) => {
    const data = await ejs.renderFile(path.join(__dirname, `../static/views/email/${template}.ejs`), params ?? {});
    return data;
}