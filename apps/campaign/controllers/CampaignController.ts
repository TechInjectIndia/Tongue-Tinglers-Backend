// src/controllers/CampaignController.ts
import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries"; // Adjust this import path as necessary
import {
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
} from "../../../constants"; // Adjust this import path as necessary

import RepoProvider from "../../RepoProvider";
import { OrganizationRepo } from "../../organization/models";
import { CampaignAdRepo } from "../models";


export default class CampaignController {
    // Method to create a campaign
    static async create(req: Request, res: Response, next: NextFunction) {
        try {

            const user_id = get(req, "user_id");

            const payload = { ...req.body, createdBy: user_id };

            const orgExist = new OrganizationRepo().get(payload.organizationId)
            if (!orgExist) {
                return res
                    .status(200)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.SUCCESS,
                            `Organization ${ERROR_MESSAGE.NOT_EXISTS}`
                        )
                    );
            }

            // const regionExist = await new RegionRepo().get(payload.region);
            // if(!regionExist){

            // }

            const campaignExist = await new CampaignAdRepo().getByName(
                payload.name
            );
            if (campaignExist) {
                return res
                    .status(409)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            `${payload.name} campaign ${ERROR_MESSAGE.EXISTS}`
                        )
                    );
            }


            const campaign = await new CampaignAdRepo().create(payload);
            return res
                .status(201)
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

    // Method to list campaigns
    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req.query, "size", 10);
            const skip = get(req.query, "skip", 0);
            const search = get(req.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly");
            let sorting = get(req?.query, "sorting", "createdAt DESC");
            sorting = sorting.toString().split(" ");

            const organizationId = get(req.query, "organizationId");
            const regionId = get(req.query, "regionId");
            const franchiseId = get(req.query, "franchiseId")
            const fromDate = get(req.query, "fromDate");
            const toDate = get(req.query, "toDate");

            const filters = {};
            if (organizationId) filters["organizationId"] = organizationId;
            if (regionId) filters["regionId"] = regionId;
            if (franchiseId) filters["franchiseId"] = franchiseId;
            if (fromDate) filters["fromDate"] = fromDate;
            if(toDate) filters["toDate"] = toDate

            const campaigns = await new CampaignAdRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
                trashOnly: trashOnly as string,
                filters,
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

    // Method to update a campaign
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req.params, "id", 0);
            const updatePayload = { ...req.body };
            delete updatePayload.id; // Remove id from the update payload

            const user_id = get(req, "user_id", 1);
            const updatedCampaign = await new CampaignAdRepo().update(
                id as number,
                { ...updatePayload, updatedBy: user_id }
            );

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        updatePayload
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Method to get a specific campaign by ID
    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req.params, "id", 1);
            const existingCampaign = await new CampaignAdRepo().get(
                id as number
            );

            if (isEmpty(existingCampaign)) {
                return res
                    .status(404)
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
                        existingCampaign
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Method to delete campaigns by IDs
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req.body, "ids", []);

            if (!Array.isArray(ids) || ids.length === 0) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "IDs must be an array and cannot be empty."
                        )
                    );
            }

            const deletedCount = await new CampaignAdRepo().delete(ids);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        deletedCount
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
