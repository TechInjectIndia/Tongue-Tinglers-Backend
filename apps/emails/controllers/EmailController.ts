import { Request, Response } from 'express';
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../constants';
import { sendResponse, sendEmailFromRequest } from '../../../libraries';
import { Multer } from 'multer'; // Import Multer types

export default class EmailController {
    static async sendEmail(req: Request, res: Response) {
        try {
            const { to, subject, body, filePaths } = req.body;
            const files = req.files as Multer.File[];

            // Initialize parsedFilePaths
            let parsedFilePaths: { path: string; name: string }[];

            // Check the type of filePaths and parse accordingly
            if (typeof filePaths === 'string') {
                try {
                    parsedFilePaths = JSON.parse(filePaths);
                } catch (error) {
                    return res.status(400).send({
                        error: true,
                        message: 'Invalid filePaths format. It should be a valid JSON string.',
                    });
                }
            }

            // Call the function to send the email
            const emailSend = await sendEmailFromRequest(
                to,
                subject,
                body,
                files,
                parsedFilePaths
            );

            if (emailSend) {
                return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.SENT_EMAIL));
            } else {
                return res.status(500).send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
            }
        } catch (err) {
            console.error('Error sending email:', err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}