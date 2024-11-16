// src/controllers/CampaignController.ts
import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { CampaignAdRepo } from "../models";
import { CampaignSubmissionsRepo } from "../models/CampaignSubmissionsRepo";

export default class CampaignController {
    // Method to save a campaign
    static async save(req: Request, res: Response, next: NextFunction) {
        try {
            // Extract only the campaignId and response from the request body
            const { campaignId, response } = req.body;

            // Validate that both fields are present
            if (!campaignId || !response) {
                return res.status(400).send({
                    message: "Both campaignId and response are required."
                });
            }

            // Create a payload with only the necessary fields
            const payload = { campaignId, response };

            // Save the submission
            const submission = await new CampaignSubmissionsRepo().save(payload);
            return res
                .status(201)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        submission
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
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            const campaigns = await new CampaignAdRepo().list({
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

    // Method to get a specific campaign by ID
    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req.params, "id", 0);
            const existingCampaign = await new CampaignAdRepo().get(id as number);

            if (isEmpty(existingCampaign)) {
                return res.status(404).send(
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
}
