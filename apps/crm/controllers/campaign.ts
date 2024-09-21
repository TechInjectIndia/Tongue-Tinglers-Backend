import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { EMAIL_STATUS } from "../../../interfaces";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { CampaignRepo } from '../models/campaign';
import { EmailRepo } from '../models/email';

export default class CampaignController {
    static async sendCampaignEmailToSubscribers(req: Request, res: Response, next: NextFunction) {
        try {
            const campaignId = get(req?.body, "campaignId", "");
            const status = EMAIL_STATUS.DELIVERED;

            const getAllSubscribers = await new CampaignRepo().getAllSubscribersByCampaignId(campaignId as number);
            // console.log(getAllSubscribers)
            // set email for all subscribers
            let subscriberId = 1;
            // const campaign = await new EmailRepo().update(campaignId, subscriberId, status);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        getAllSubscribers
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
    // static async campaignAssignment(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const campaignId = get(req?.body, "campaignId", "");
    //         const subscriberId = get(req?.body, "subscriberId", "");
    //         const status = EMAIL_STATUS.DRAFT;

    //         const campaign = await new EmailRepo().campaignAssignment(campaignId, subscriberId, status);
    //         return res
    //             .status(200)
    //             .send(
    //                 sendResponse(
    //                     RESPONSE_TYPE.SUCCESS,
    //                     SUCCESS_MESSAGE.CREATED,
    //                     campaign
    //                 )
    //             );
    //     } catch (err) {
    //         return res.status(500).send({
    //             message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    //         });
    //     }
    // }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const name = get(req?.body, "name", "");
            const status = get(req?.body, "status", 1);
            const subject = get(req?.body, "subject", '');
            const body = get(req?.body, "body", '');
            const scheduledAt = get(req?.body, "scheduledAt", '');

            const campaign = await new CampaignRepo().create({ name, subject, body, status, scheduledAt });
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        campaign
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            const campaigns = await new CampaignRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
                trashOnly: trashOnly as string
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        campaigns
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);
            const name = get(req?.body, "name", "");
            const status = get(req?.body, "status", 1);
            const subject = get(req?.body, "subject", '');
            const body = get(req?.body, "body", '');
            const scheduledAt = get(req?.body, "scheduledAt", '');

            const campaign = await new CampaignRepo().update(id as number, { name, subject, body, status, scheduledAt });
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        campaign
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);
            const campaign = await new CampaignRepo().get(id as number);
            if (isEmpty(campaign)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        campaign
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req?.body, "ids", "");
            const campaign = await new CampaignRepo().delete(ids);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        campaign
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