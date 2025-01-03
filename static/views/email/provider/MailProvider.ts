import { ResendController } from "../repositories/ResendController";
import { CONFIG } from "../../../../config";


export default class MailProvider {
    private static _resend: ResendController | null = null;
    // private static _nodemailer: NodemailerController | null = null;

    /**
     * Gets an instance of ResendController. Initializes it if it hasn't been already.
     * @returns {ResendController} An instance of ResendController.
     */
    static getResendController(): ResendController {
        if (this._resend === null) {
            this._resend = new ResendController(CONFIG.RESEND_API_KEY);
        }
        return this._resend;
    }

    /**
     * Gets an instance of NodemailerController. Initializes it if it hasn't been already.
     * @returns {NodemailerController} An instance of NodemailerController.
     */
    // static getNodemailerController(): NodemailerController {
    //     if (this._nodemailer === null) {
    //         if (!NODEMAILER_USER || !NODEMAILER_PASS) {
    //             throw new Error(
    //                 "NODEMAILER_USER or NODEMAILER_PASS environment variables are not set."
    //             );
    //         }
    //         this._nodemailer = new NodemailerController(NODEMAILER_USER, NODEMAILER_PASS);
    //     }
    //     return this._nodemailer;
    // }
}
