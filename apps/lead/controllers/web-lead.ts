import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { LeadRepo } from '../models/web-lead';
import { LEAD_SOURCE, LEAD_STATUS } from '../../../interfaces';

export default class WebLeadController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            let getAttributes: any = '';
            const whereName = 'email'
            const whereVal = get(req?.body, "email", "");

            const existingLead = await new LeadRepo().getLeadByAttr(whereName, whereVal, getAttributes);
            if (existingLead) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.EXISTS
                        )
                    );
            }

            const createLead = { ...req?.body, source: LEAD_SOURCE.WEBSITE, status: LEAD_STATUS.NEW };
            const Lead = await new LeadRepo().create(createLead);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        Lead
                    )
                );
        } catch (err) {
            console.log(err)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}