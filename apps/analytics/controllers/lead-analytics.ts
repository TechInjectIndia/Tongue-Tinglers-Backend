import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, getDateRange } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { AnalyticsModel } from '../models/lead-analytics';
import { CampaignAdRepo } from '../../campaign/models/index';

export default class LeadAnalyticsController {

    static async leadStatusByStatusType(req: Request, res: Response, next: NextFunction) {
        try {
            const statusType = get(req.query, "statusType", "") as string;
            const filter = get(req.query, "filter", "") as string;
            const startDate = get(req.query, "startDate", "") as string;
            const endDate = get(req.query, "endDate", "") as string;
            const dateRange = getDateRange(filter, startDate, endDate);

            const analyticsData = await new AnalyticsModel().leadStatusByType(statusType, dateRange.start, dateRange.end);

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.FETCHED,
                    analyticsData
                )
            );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async leadStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const filter = get(req.query, "filter", "") as string;
            const startDate = get(req.query, "startDate", "") as string;
            const endDate = get(req.query, "endDate", "") as string;
            const dateRange = getDateRange(filter, startDate, endDate);

            const analyticsData = await new AnalyticsModel().leadStatus(dateRange.start, dateRange.end);
            const chartData = {
                label: analyticsData.map(item => item.status),
                data: analyticsData.map(item => item.dataValues.count),
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

    static async leadStatusByFranchiseId(req: Request, res: Response, next: NextFunction) {
        try {
            const franchiseid = get(req.query, "franchiseId", "") as string;
            const filter = get(req.query, "filter", "") as string;
            const startDate = get(req.query, "startDate", "") as string;
            const endDate = get(req.query, "endDate", "") as string;
            const dateRange = getDateRange(filter, startDate, endDate);

            const campaigns = await new CampaignAdRepo().getCampaignsByFranchiseId(franchiseid as string);
            // get leads where campaign id is campaigns.id using map
            const campaignIds = campaigns.map(campaign => campaign.id);
            const analyticsData = await new AnalyticsModel().getLeadStatusByCampaignIdsAndDateRange(campaignIds, dateRange.start, dateRange.end);

            const chartData = {
                label: analyticsData.map(item => item.status),
                data: analyticsData.map(item => item.dataValues.count),
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

    static async leadSources(req: Request, res: Response, next: NextFunction) {
        try {
            const filter = get(req.query, "filter", "") as string;
            const startDate = get(req.query, "startDate", "") as string;
            const endDate = get(req.query, "endDate", "") as string;
            const dateRange = getDateRange(filter, startDate, endDate);

            const analyticsData = await new AnalyticsModel().leadSources(dateRange.start, dateRange.end);
            const chartData = {
                label: analyticsData.map(item => item.source),
                data: analyticsData.map(item => item.dataValues.count),
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

    static async conversionRate(req: Request, res: Response, next: NextFunction) {
        try {
            const filter = get(req.query, "filter", "") as string;
            const startDate = get(req.query, "startDate", "") as string;
            const endDate = get(req.query, "endDate", "") as string;
            const dateRange = getDateRange(filter, startDate, endDate);

            const analyticsData = await new AnalyticsModel().conversionRate(dateRange.start, dateRange.end);
            const chartData = {
                label: analyticsData.map(item => item.source),
                data: analyticsData.map(item => item.dataValues.count),
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
            const filter = get(req.query, "filter", "") as string;
            const startDate = get(req.query, "startDate", "") as string;
            const endDate = get(req.query, "endDate", "") as string;
            const dateRange = getDateRange(filter, startDate, endDate);

            const analyticsData = await new AnalyticsModel().salesPipeline(dateRange.start, dateRange.end);
            const chartData = {
                label: analyticsData.map(item => item.source),
                data: analyticsData.map(item => item.dataValues.count),
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