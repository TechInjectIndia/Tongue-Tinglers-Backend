// src/controllers/CampaignSubmissionsController.ts
import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { CampaignSubmissionsRepo } from "../models/CampaignSubmissionsRepo";

export default class CampaignSubmissionsController {
    // Method to list campaigns
    static async list(req: Request, res: Response, next: NextFunction) {
        try {

            let size = parseInt(get(req.query.toString(), "size", "10"));
            if (isNaN(size)) size = 10;
            let skip = parseInt(get(req.query.toString(), "skip", "0"));
            if (isNaN(skip)) skip = 0;

            const search = get(req.query, "search", "").toString();
            const trashOnly = get(req?.query, "trashOnly", "").toString();
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            const campaigns = await new CampaignSubmissionsRepo().list({
                offset: skip,
                limit: size ,
                search: search,
                sorting: sorting,
                trashOnly: trashOnly
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

            const id = parseInt(get(req.params, "id"));
            if(isNaN(id)) throw Error('Missing id or isNaN')

            const payload = await new CampaignSubmissionsRepo().get(id);

            if (isEmpty(payload)) {
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
                        payload
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
                return res.status(400).send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        "IDs must be an array and cannot be empty."
                    )
                );
            }

            const deletedCount = await new CampaignSubmissionsRepo().delete(ids);
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
