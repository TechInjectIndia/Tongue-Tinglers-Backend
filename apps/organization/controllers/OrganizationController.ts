// src/controllers/CampaignController.ts
import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries"; // Adjust this import path as necessary
import {
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
} from "../../../constants"; // Adjust this import path as necessary
import { OrganizationRepo } from "../models";

export default class OrganizationController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, "user_id", 0);
            const payload = {
                ...req.body,
                createdBy: user_id,
                rootUserId: user_id,
            };

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

    static async get(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const id = get(req.params, "id", "");
            // todo remove type casting
            const existingOrganization = await new OrganizationRepo().get(
                id as unknown as number
            );
            if (isEmpty(existingOrganization)) {
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
                        existingOrganization
                    )
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async update(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const user_id = get(req, "user_id", "");
            const id = get(req.params, "id", "");
            const payload = { ...req.body, createdBy: user_id };

            const existingOrganization = await new OrganizationRepo().get(
                id as unknown as number
            );
            if (isEmpty(existingOrganization)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            const updatedOrganization = await new OrganizationRepo().update(
                id as unknown as number,
                payload
            );

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        updatedOrganization
                    )
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const id = get(req.params, "id", "");

            const existingOrganization = await new OrganizationRepo().get(
                id as unknown as number
            );
            if (isEmpty(existingOrganization)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            const deletedCount = await new OrganizationRepo().delete(id);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        { deletedCount }
                    )
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async list(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const size = get(req.query, "size", 10);
            const skip = get(req.query, "skip", 1);
            const search = get(req.query, "search", "");
            const sorting = get(req.query, "sorting", "id DESC")
                .toString()
                .split(" ");

            const leadsList = await new OrganizationRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        leadsList
                    )
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }
}
