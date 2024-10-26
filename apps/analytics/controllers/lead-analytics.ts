import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, getDateRange } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { AnalyticsModel } from '../models/lead-analytics';

export default class LeadAnalyticsController {

    static async leadSources(req: Request, res: Response, next: NextFunction) {
        try {
            const period = get(req?.query, "range", '');
            const filter = get(req.query, "filter", "") as string;
            const startDate = get(req.query, "startDate", "") as string;
            const endDate = get(req.query, "endDate", "") as string;
            const dateRange = getDateRange(filter, startDate, endDate);

            const analyticsData = await new AnalyticsModel().leadSources(dateRange.start, dateRange.end);
            const chartData = {
                label: analyticsData.map(item => item.source),
                data: analyticsData.map(item => item.count),
            };

            console.log(analyticsData.map(item => item.source))

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.FETCHED,
                    chartData
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
            const filter = get(req.query, "filter", "") as string;
            const startDate = get(req.query, "startDate", "") as string;
            const endDate = get(req.query, "endDate", "") as string;
            const dateRange = getDateRange(filter, startDate, endDate);

            const analyticsData = await new AnalyticsModel().conversionRate(dateRange.start, dateRange.end);
            const chartData = {
                label: analyticsData.map(item => item.source),
                data: analyticsData.map(item => item.count),
            };

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.FETCHED,
                    chartData
                )
            );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Sales Pipeline Analytics
    static async salesPipeline(req: Request, res: Response, next: NextFunction) {
        try {
            const period = get(req.query, "range", "");
            const filter = get(req.query, "filter", "") as string;
            const startDate = get(req.query, "startDate", "") as string;
            const endDate = get(req.query, "endDate", "") as string;
            const dateRange = getDateRange(filter, startDate, endDate);

            const analyticsData = await new AnalyticsModel().salesPipeline(dateRange.start, dateRange.end);
            const chartData = {
                label: analyticsData.map(item => item.source),
                data: analyticsData.map(item => item.count),
            };

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.FETCHED,
                    chartData
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