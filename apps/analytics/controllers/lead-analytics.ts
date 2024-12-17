import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { sendResponse, getDateRange } from "../../../libraries";
import {
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
} from "../../../constants";
import { AnalyticsModel } from "../models/lead-analytics";
import { CampaignAdRepo } from "../../campaign/models";
import {
    subDays,
    eachDayOfInterval,
    eachMonthOfInterval,
    format,
} from "date-fns";
import { TLeadFilters } from "../../../types";
import RepoProvider from "../../RepoProvider";

export default class LeadAnalyticsController {

    static async leadStatusByStatusType(req: Request, res: Response, next: NextFunction) {
        try {

            const user_id = get(req, "user_id", "");

            const franchiseId = get(req, "franchise_id", "");
            const statusType = get(req.query, "statusType", "") as string;
            const filter = get(req.query, "filter", "") as string;
            const startDate = get(req.query, "startDate", "") as string;
            const endDate = get(req.query, "endDate", "") as string;
            const dateRange = getDateRange(filter, startDate, endDate);

            // const franchiseData = await franchiseRepo.getFranchiseeByUserId(user_id as number);
            // if (!franchiseData) {
            //     return res.status(404).send({ message: 'Franchise data not found.' });
            // }
            // switch (franchiseData.franchiseType) {
            //     case FranchiseType.MASTER_FRANCHISE:
            //         analyticsData = await new AnalyticsModel().leadStatusByTypeForMasterFranchisee(statusType, dateRange.start, dateRange.end, franchiseId);
            //         break;
            //     case FranchiseType.SUPER_FRANCHISE:
            //         analyticsData = await new AnalyticsModel().leadStatusByTypeForSuperFranchisee(statusType, dateRange.start, dateRange.end, franchiseId, franchiseData);
            //         break;
            //     case FranchiseType.FRANCHISE:
            //         analyticsData = await new AnalyticsModel().leadStatusByTypeForFranchisee(statusType, dateRange.start, dateRange.end, franchiseData);
            //         break;
            //     default:
            //         return res.status(400).send({ message: 'Invalid franchise type.' });
            // }

            // const franchiseData = await franchiseRepo.getFranchiseeByUserId(user_id as string);
            // if (!franchiseData) {
            //     return res.status(404).send({ message: 'Franchise data not found.' });
            // }
            // switch (franchiseData.franchiseType) {
            //     case FranchiseType.MASTER_FRANCHISE:
            //         analyticsData = await new AnalyticsModel().leadStatusByTypeForMasterFranchisee(statusType, dateRange.start, dateRange.end, franchiseId);
            //         break;
            //     case FranchiseType.SUPER_FRANCHISE:
            //         analyticsData = await new AnalyticsModel().leadStatusByTypeForSuperFranchisee(statusType, dateRange.start, dateRange.end, franchiseId, franchiseData);
            //         break;
            //     case FranchiseType.FRANCHISE:
            //         analyticsData = await new AnalyticsModel().leadStatusByTypeForFranchisee(statusType, dateRange.start, dateRange.end, franchiseData);
            //         break;
            //     default:
            //         return res.status(400).send({ message: 'Invalid franchise type.' });
            // }

            const analyticsData = await new AnalyticsModel().leadStatusByTypeForSuperFranchisee(statusType, dateRange.start, dateRange.end);

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.FETCHED,
                    analyticsData,
                ),
            );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async leadTimeline(req: Request, res: Response, next: NextFunction) {
        try {

            const franchiseId = get(req, "franchise_id", "");

            const user_id = parseInt(get(req, 'user_id'));
            if(isNaN(user_id)) throw Error('userId not passed or isNan')

            let analyticsData: any[] = [];

            const filter = get(req.query, "filter", "this_year") as string;
            const startDateString = get(req.query, "startDate", "") as string;
            const endDateString = get(req.query, "endDate", "") as string;

            const dateRange = getDateRange(filter, startDateString, endDateString);

            const startDate = new Date(dateRange.start);
            const endDate = new Date(dateRange.end);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate > endDate) {
                throw new Error("Invalid date range provided.");
            }

            let groupBy: string;
            let dateInterval: Date[];

            if (filter === "this_week" || filter === "last_week" || filter === "this_month" || filter === "last_month") {
                groupBy = "day";
                dateInterval = eachDayOfInterval({
                    start: startDate,
                    end: endDate,
                });
            } else if (filter === "this_year" || filter === "last_year") {
                groupBy = "month";
                dateInterval = eachMonthOfInterval({
                    start: startDate,
                    end: endDate,
                });
            } else {
                groupBy = "day";
                dateInterval = eachDayOfInterval({
                    start: startDate,
                    end: endDate,
                });
            }

            const franchiseData = await RepoProvider.franchise.getById(user_id);
            if (!franchiseData) {
                return res.status(404).send({ message: "Franchise data not found." });
            }
            console.log("franchiseData.franchiseType", franchiseData);
            switch (franchiseData) {
                // case FranchiseType.MASTER_FRANCHISE:
                //     analyticsData = await new AnalyticsModel().leadTimelineForMasterFranchisee(startDate, endDate, groupBy, franchiseId);
                //     break;
                // case FranchiseType.SUPER_FRANCHISE:
                //     analyticsData = await new AnalyticsModel().leadTimelineForSuperFranchisee(startDate, endDate, groupBy, franchiseData, franchiseId);
                //     break;
                // case FranchiseType.FRANCHISE:
                //     analyticsData = await new AnalyticsModel().leadTimelineForFranchisee(startDate, endDate, groupBy, franchiseData);
                //     break;
                default:
                    return res.status(400).send({ message: "Invalid franchise type." });
            }

            // Format dates in analyticsData to match dateInterval formatting
            const formattedAnalyticsData = analyticsData.map(item => ({
                date: format(new Date(item.get("date")), groupBy === "day" ? "yyyy-MM-dd" : "yyyy-MM"),
                count: parseInt(item.get("count"), 10),
            }));

            // Map the data into a Map object with formatted dates
            const dataMap = new Map(formattedAnalyticsData.map(item => [item.date, item.count]));

            // Prepare the chart data with missing dates filled as 0
            const chartData = {
                label: dateInterval.map(date => format(date, groupBy === "day" ? "yyyy-MM-dd" : "yyyy-MM")),
                data: dateInterval.map(date => {
                    const formattedDate = format(date, groupBy === "day" ? "yyyy-MM-dd" : "yyyy-MM");
                    return dataMap.get(formattedDate) || 0;
                }),
            };

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.FETCHED,
                    chartData,
                ),
            );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async leadList(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const user_id = parseInt(get(req, 'user_id'));
            if(isNaN(user_id)) throw Error('userId not passed or isNan')


            const size = get(req.query, "size", 100);
            const skip = get(req.query, "skip", 0);
            const search = get(req.query, "search", "") as string;
            const sorting = get(req.query, "sorting", "id DESC").toString().split(" ");
            const filter = get(req.query, "filter", "this_year") as string;
            const startDate = get(req.query, "startDate", "") as string;
            const endDate = get(req.query, "endDate", "") as string;
            let leadsList: any = [];

            // Calculate date range based on the filter type using the library function
            const dateRange = getDateRange(filter, startDate, endDate);


            const franchiseId = get(req, "franchise_id", "");

            const franchiseData = await RepoProvider.franchise.getById(user_id);
            if (!franchiseData) {
                return res.status(404).send({ message: "Franchise data not found." });
            }
            console.log("franchiseData.franchiseType", franchiseData);
            leadsList = await new AnalyticsModel().list({
                offset: skip,
                limit: size,
                search,
                sorting,
                dateRange,
                franchiseData,
                franchiseId,
            } as TLeadFilters);
            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, leadsList));

        } catch (err) {
            console.error(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
                error: err.message,
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

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.FETCHED,
                    analyticsData,
                ),
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

            const franchiseId = parseInt(get(req, 'franchiseId'));
            if(isNaN(franchiseId)) throw Error('userId not passed or isNan')

            const filter = get(req.query, "filter", "").toString();
            const startDate = get(req.query, "startDate", "").toString();
            const endDate = get(req.query, "endDate", "").toString();
            const dateRange = getDateRange(filter, startDate, endDate);

            const campaigns = await new CampaignAdRepo().getCampaignsByFranchiseId(franchiseId);
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
                    chartData,
                ),
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
                    chartData,
                ),
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
                    chartData,
                ),
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
                    chartData,
                ),
            );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
