import { Resend } from 'resend';
import { CONFIG } from '../config';
const path = require("path");
const ejs = require("ejs");

export const EMAIL_TEMPLATES = {
    WELCOME_ADMIN_USER: 'welcome-admin-user'
}

const resend = new Resend(CONFIG.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, template: string, templateParams?: any) => {
    ejs
        .renderFile(path.join(__dirname, "../views/email/index.ejs"), templateParams ?? {})
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
