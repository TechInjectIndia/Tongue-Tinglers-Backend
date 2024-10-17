import { Request, Response } from 'express';
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../constants';
import { sendResponse, sendEmailFromRequest } from '../../../libraries';

export default class EmailController {

    static async sendEmail(req: Request, res: Response) {
        try {
            const { to, subject, body, filePath } = req.body;
            const file = req.file;

            // Send the email with the provided file or file path
            await sendEmailFromRequest(to, subject, body, file, filePath);

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, 'don'));
        } catch (err) {
            console.error("Error sending email:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
