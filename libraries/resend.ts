import { Resend } from 'resend';
import { CONFIG } from '../config';
const path = require("path");
const ejs = require("ejs");

const resend = new Resend(CONFIG.RESEND_API_KEY);

export const EMAIL_HEADING = {
    NEW_ADMIN_ADDED: 'Welcome to Tongue Tinglers'
}

export const EMAIL_TEMPLATE = {
    NEW_ADMIN_ADDED: 'welcome-admin-user'
}

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
    ejs
        .renderFile(path.join(__dirname, "../views/email/index.ejs"), paramsData)
        .then((result) => {
            resend.emails.send({
                from: 'onboarding@resend.dev',
                to,
                subject,
                html: result
            });
        })
        .catch((err) => {
            console.log('Error loading email', err);
        });
}

export const getEmailTemplate = async (template: string, params?: any) => {
    const data = await ejs.renderFile(path.join(__dirname, `../views/email/${template}.ejs`), params ?? {});
    return data;
}
