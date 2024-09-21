import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../../constants";
import { AnalyticsModel } from '../../models/lead-analytics';

export default class RetortAnalyticsController {
    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const startDate = new Date(get(req.query, "startDate", new Date(0)) as string);
            const endDate = new Date(get(req.query, "endDate", new Date()) as string);

            const analyticsData = await new AnalyticsModel().leadSources(
                startDate,
                endDate,
            );

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.FETCHED,
                    analyticsData
                )
            );
        } catch (err) {
            console.error("Error fetching analytics data:", err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
