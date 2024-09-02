import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { FollowUpsModel } from '../models/followup';

export default class FollowUpsController {

    static async getTodayFollowUps(req: Request, res: Response, next: NextFunction) {
        try {
            let startDate = get(req?.query, "start_date", "");
            let endDate = get(req?.query, "end_date", "");
            let assignedTo = get(req, "user_id", "");

            startDate = new Date(startDate);
            endDate = new Date(endDate);
            let getAttributes: any = ['*'];

            const existingLead = await new FollowUpsModel().getFollowUpsToday(startDate, endDate, assignedTo, getAttributes);

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
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}