import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, sendEmail, getEmailTemplate, EMAIL_TEMPLATE, EMAIL_HEADING } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { FollowUpsRepo } from '../models/followup';
import { CONFIG } from '../../../config';

export default class FollowUpsController {

    static async getTodayFollowUps(req: Request, res: Response, next: NextFunction) {
        try {
            let assignedTo = get(req, "user_id", 0);
            let getAttributes: any = ['*'];

            const existingLead = await new FollowUpsRepo().getFollowUpsToday(assignedTo, getAttributes);
            if (isEmpty(existingLead)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }
            console.log(existingLead);

            // // Email Sending Logic Starts
            // const emailContent = await getEmailTemplate(EMAIL_TEMPLATE.FOLLOW_UP_REMINDER, {
            //     userName: existingLead.name,
            //     followUps: existingLead,
            // });

            // const mailOptions = {
            //     to: CONFIG.ADMIN_EMAIL,
            //     subject: EMAIL_HEADING.FOLLOW_UP_REMINDER,
            //     templateParams: {
            //         heading: EMAIL_HEADING.FOLLOW_UP_REMINDER,
            //         description: emailContent,
            //     },
            // };

            // await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.templateParams);
            // Email Sending Logic Ends

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        existingLead
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}