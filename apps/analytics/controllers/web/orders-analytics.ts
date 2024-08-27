import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../../constants";
import { AnalyticsModel } from '../../models/lead-analytics';

export default class OrdersAnalyticsController {

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const start_date = get(req?.query, "start_date", '');
            const end_date = get(req?.query, "end_date", '');

            const Analyticss = await new AnalyticsModel().leadSources({
                offset: parseInt(end_date),
                limit: parseInt(start_date),
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        Analyticss
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

}