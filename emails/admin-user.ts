import { sendEmail, TemplateId } from "./config";
import { CONFIG } from "../config";

export const sendWelcomeUserEmail = async (email: string) => {
    await sendEmail(email, TemplateId.WelcomeAdminUser, {
        loginlink: `${CONFIG.APP_BASE_URL}/signin`,
        username: email,
    });
};
