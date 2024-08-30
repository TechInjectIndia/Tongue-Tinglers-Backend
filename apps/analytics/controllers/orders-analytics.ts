import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { AnalyticsModel } from '../models/orders-analytics';

// Helper function to get the start of the week (Monday)
function getStartOfWeek(date) {
    const start = date.getDate() - date.getDay() + 1; // Adjusted to Monday
    return new Date(date.setDate(start));
}

// Helper function to get the end of the week (Sunday)
function getEndOfWeek(date) {
    const end = date.getDate() - date.getDay() + 7; // Adjusted to Sunday
    return new Date(date.setDate(end));
}

// Helper function to get the start of the month
function getStartOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

// Helper function to get the end of the month
function getEndOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// Helper function to get the start of the year
function getStartOfYear(date) {
    return new Date(date.getFullYear(), 0, 1);
}

// Helper function to get the end of the year
function getEndOfYear(date) {
    return new Date(date.getFullYear(), 11, 31);
}

// Example usage
const today = new Date();
const thisWeekStart = getStartOfWeek(new Date(today));
const thisWeekEnd = getEndOfWeek(new Date(today));
const thisMonthStart = getStartOfMonth(new Date(today));
const thisMonthEnd = getEndOfMonth(new Date(today));
const thisYearStart = getStartOfYear(new Date(today));
const thisYearEnd = getEndOfYear(new Date(today));

// Helper functions to calculate date ranges
function getDateRange(period) {
    const today = new Date();
    let start, end;

    switch (period) {
        case 'week':
            start = getStartOfWeek(new Date(today));
            end = getEndOfWeek(new Date(today));
            break;
        case 'month':
            start = getStartOfMonth(new Date(today));
            end = getEndOfMonth(new Date(today));
            break;
        case 'year':
            start = getStartOfYear(new Date(today));
            end = getEndOfYear(new Date(today));
            break;
        default:
            throw new Error('Invalid period');
    }

    return { start, end };
}

export default class OrdersAnalyticsController {

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const period = req.params.period;

            const { start, end } = getDateRange(period);
            // Mock data - Replace with actual data fetching logic
            const data = [
                { date: start.toISOString().split('T')[0], value: Math.random() * 100 },
                { date: end.toISOString().split('T')[0], value: Math.random() * 100 }
            ];

            console.log(data);

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