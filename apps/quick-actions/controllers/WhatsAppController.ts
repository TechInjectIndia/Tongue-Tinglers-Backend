import { Request, Response } from 'express';
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../constants';
import { sendResponse, sendWhatsAppMessage } from '../../../libraries';

export default class WhatsAppController {
    static async sendNotification(req: Request, res: Response) {
        try {
            const { to, body, filePaths, phonenumber } = req.body;

            let parsedFilePaths: { path: string; name: string }[] = [];
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

            const notificationSend = await sendWhatsAppMessage(to, body, parsedFilePaths);

            // if (notificationSend) {
            //     return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.SENT_NOTIFICATION));
            // } else {
            //     return res.status(500).send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
            // }
        } catch (err) {
            console.error('Error sending WhatsApp notification:', err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
