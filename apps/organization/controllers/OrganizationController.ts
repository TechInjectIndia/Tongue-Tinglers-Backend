// src/controllers/CampaignController.ts
import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { sendResponse } from "../../../libraries"; // Adjust this import path as necessary
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants"; // Adjust this import path as necessary
import { OrganizationRepo } from "../models";

export default class OrganizationController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, 'user_id', '');
            const payload = { ...req.body, createdBy: user_id };

            const data = await new OrganizationRepo().create(payload);
            return res
                .status(201)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        data
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
