import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, getDateRange } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { AnalyticsModel } from '../models/orders-analytics';

export default class OrdersAnalyticsController {

    static async getOrdersCount(req: Request, res: Response, next: NextFunction) {
        try {
            const period = get(req?.query, "range", '');
            const { start, end } = getDateRange(period);

            // const data = [
            //     { date: start.toISOString().split('T')[0], value: Math.random() * 100 },
            //     { date: end.toISOString().split('T')[0], value: Math.random() * 100 }
            // ];

            const Analyticss = await new AnalyticsModel().orderCountByDateWise(start, end);

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