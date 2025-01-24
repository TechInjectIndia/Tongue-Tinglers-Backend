import { CONFIG } from "config";
import {
    type DTO,
    getHandledErrorDTO,
    getSuccessDTO,
    getUnhandledErrorDTO,
} from "../../../../apps/common/models/DTO";
import { AllMailOptions } from "../models/MailOptions";
import type { IResendController } from "./IResendController";
// import type { ResendMailOptions } from "../models/Resend";

import { Resend } from "resend";

// resend mail syntax shoulb be
// ----@------
// anything@domain
export class ResendController implements IResendController {
    private readonly resendMail = "nitesh.kumar@techinject.co.in";
    private resendInstance: Resend;
    //
    constructor(apiKey: string) {
        this.resendInstance = new Resend(CONFIG.RESEND_API_KEY);
    }

    async sendMail(mailOptions: AllMailOptions): Promise<DTO<boolean>> {
        try {
            const response = await this.resendInstance.emails.send({
                from: this.resendMail,
                to: mailOptions.to,
                subject: mailOptions.subject,
                react: mailOptions.react ? mailOptions.react : null,
                html: mailOptions.html ? (mailOptions.html as string) : undefined,
                attachments: mailOptions.attachments ? mailOptions.attachments : undefined,
            });
            //

            if (response.error !== null) {
                return getUnhandledErrorDTO(response.error.message, response.error.message);
            }
            return getSuccessDTO(true);
        } catch (error: any) {
            return getHandledErrorDTO(error.message ?? `${error}`);
        }
    }
}
