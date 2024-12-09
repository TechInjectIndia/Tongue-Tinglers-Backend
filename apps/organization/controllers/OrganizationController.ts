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
import {
    IOrganizationPayloadDataWithMeta,
    Organization,
} from "../../../interfaces/organization";
import { Pagination } from "../../../interfaces";
import RepoProvider from "../../RepoProvider";

export default class OrganizationController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, "user_id", 0);

            console.log(user_id);

            const payload: IOrganizationPayloadDataWithMeta = {
                ...req.body,
                createdBy: 1,
                rootUser: 1,
            };
            const data = await new OrganizationRepo().create(payload, user_id);
            return res
                .status(201)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        data,
                    ),
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
        next: NextFunction,
    ): Promise<Response> {
        try {
            const id = get(req.params, "id", "");
            // todo remove type casting
            const existingOrganization = await new OrganizationRepo().get(
                id as unknown as number,
            );
            if (isEmpty(existingOrganization)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS,
                        ),
                    );
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        existingOrganization,
                    ),
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
        next: NextFunction,
    ): Promise<Response> {
        try {
            const user_id = get(req, "user_id", "");
            const id = get(req.params, "id", "");
            const payload = { ...req.body, createdBy: user_id };

            const existingOrganization = await new OrganizationRepo().get(
                id as unknown as number,
            );
            if (isEmpty(existingOrganization)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS,
                        ),
                    );
            }

            const updatedOrganization = await new OrganizationRepo().update(
                id as unknown as number,
                payload,
            );

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        updatedOrganization,
                    ),
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
        next: NextFunction,
    ): Promise<Response> {
        try {
            const id = get(req.params, "id", "");

            const existingOrganization = await new OrganizationRepo().get(
                id as unknown as number,
            );
            if (isEmpty(existingOrganization)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS,
                        ),
                    );
            }

            const deletedCount = await new OrganizationRepo().delete(id);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        { deletedCount },
                    ),
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
        next: NextFunction,
    ): Promise<Response> {
        try {
            const page = parseInt(req.query.page, 0) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;
            const search = (req.query.search as string) || ""; // For text search
            const filters = (req.query.filters as string) || "";

            // Parse filters into an object
            let filterObj = {};
            if (filters) {
                try {
                    filterObj = JSON.parse(filters);
                } catch (error) {
                    return res.status(400).send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Invalid filter format. It should be a valid JSON string.",
                        ),
                    );
                }
            }
            const Franchise: Pagination<Organization> = await RepoProvider.getAll(page, limit, search, filterObj);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        {
                            ...Franchise,
                            currentPage: page,
                        },
                    ),
                );

        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, "An error occurred while fetching products."),
            );
        }
    }
}
