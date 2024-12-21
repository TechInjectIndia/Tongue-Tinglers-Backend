import {Request, Response} from 'express';
import {
    ERROR_MESSAGE,
    RESPONSE_TYPE,
    SUCCESS_MESSAGE
} from '../../../constants';
import {sendEmailFromRequest, sendResponse} from '../../../libraries';

import {EmailRepo} from '../models/EmailRepo';
import { get, isNaN } from 'lodash';

export default class EmailController {
    static async sendEmail(req: Request, res: Response) {
        try {
            const user_id = parseInt(get(req, "user_id"))
            if(!user_id || isNaN(user_id)){
                throw Error(
                    'Missing user_id or isNaN');
            }
            const {to, subject, body, filePaths} = req.body;
            const files = req.files as Express.Multer.File[];

            let parsedFilePaths: { path: string; name: string }[];
            if (typeof filePaths === 'string') {
                try {
                    parsedFilePaths = JSON.parse(filePaths);
                }
                catch (error) {
                    return res.status(400).send({
                        error: true,
                        message: 'Invalid filePaths format. It should be a valid JSON string.',
                    });
                }
            }

            const emailSend = await sendEmailFromRequest(
                to,
                subject,
                body,
                files,
                parsedFilePaths
            );

            if (emailSend) {
                await EmailRepo.create({
                    to,
                    subject,
                    body,
                    sentAt: new Date(),
                }, user_id);

                return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.SENT_EMAIL));
            } else {
                return res.status(500).send(sendResponse(RESPONSE_TYPE.ERROR,
                    ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
            }
        }
        catch (err) {
            console.error('Error sending email:', err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
