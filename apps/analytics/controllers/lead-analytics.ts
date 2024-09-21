import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, getDateRange } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { AnalyticsModel } from '../models/lead-analytics';

export default class LeadAnalyticsController {

    static async leadSources(req: Request, res: Response, next: NextFunction) {
        try {
            const period = get(req?.query, "range", '');
            const { start, end } = getDateRange(period);

            // const data = [
            //     { date: start.toISOString().split('T')[0], value: Math.random() * 100 },
            //     { date: end.toISOString().split('T')[0], value: Math.random() * 100 }
            // ];
            // console.log(data)

            const Analyticss = await new AnalyticsModel().leadSources(start, end);
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
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async conversionRate(req: Request, res: Response, next: NextFunction) {
        try {
            const period = get(req?.query, "range", '');
            const { start, end } = getDateRange(period);

            const Analyticss = await new AnalyticsModel().conversionRate(start, end);
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
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async salesPipeline(req: Request, res: Response, next: NextFunction) {}

}