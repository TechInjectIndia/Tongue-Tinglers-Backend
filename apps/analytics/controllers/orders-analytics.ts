import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, getDateRange } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { AnalyticsModel } from '../models/orders-analytics';

export default class OrdersAnalyticsController {

    static async getOrdersCount(req: Request, res: Response, next: NextFunction) {
        try {
            const period = get(req?.query, "range", '');
            const filter = get(req.query, "filter", "") as string;
            const startDate = get(req.query, "startDate", "") as string;
            const endDate = get(req.query, "endDate", "") as string;
            const dateRange = getDateRange(filter, startDate, endDate);

            const Analyticss = await new AnalyticsModel().orderCountByDateWise(dateRange.start, dateRange.end);

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

}