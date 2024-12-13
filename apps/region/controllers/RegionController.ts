import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { RegionRepo } from "../models/RegionRepo";
import { AreaRepo } from "../../area/models/AreaRepo";

export default class RegionController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, 'user_id', 0);
            const payload = { ...req.body, createdBy: user_id };
            const { area = null } = { ...req.body };

            if (!Array.isArray(area)) {
                return res.status(400).send({
                    message: 'Area must be an array.',
                });
            }

            if (area.length === 0) {
                return res.status(400).send({
                    message: 'Area cannot be an empty array.',
                });
            }

            if (!area.every((item) => typeof item === 'number')) {
                return res.status(400).send({
                    message: 'Each area value must be a number.',
                });
            }

            for (let item of area) {
                const areaResponse = await new AreaRepo().get(item);

                // If area does not exist, return an error
                if (!areaResponse) {
                    return res.status(404).send({
                        message: `Area with ID ${item} does not exist.`,
                    });
                }
            }

            const region = await new RegionRepo().create(payload);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        region
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
            const size = get(req.query, "size", 10);
            const skip = get(req.query, "skip", 0);
            const search = get(req.query, "search", "");
            const trashOnly = get(req.query, "trashOnly", "");
            let sorting = get(req.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            const id = get(req.query, "id", "");
            const title = get(req.query, "title", "");
            const area = get(req.query, "area", "");
            const createdBy = get(req.query, "createdBy", "");

            const filters = {};
            if (id) filters["id"] = id;
            if (title) filters["title"] = title;
            if (area) filters["area"] = area;
            if (createdBy) filters["createdBy"] = createdBy;

            const regions = await new RegionRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting,
                trashOnly: trashOnly as string,
                filters
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        regions
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
            const id = get(req.params, "id", 0);
            const updateData = req.body;
            delete updateData.id;
            const user_id = get(req, "user_id", "");
            const { area = null } = { ...req.body };

            if (!Array.isArray(area)) {
                return res.status(400).send({
                    message: 'Area must be an array.',
                });
            }

            if (area.length === 0) {
                return res.status(400).send({
                    message: 'Area cannot be an empty array.',
                });
            }

            if (!area.every((item) => typeof item === 'number')) {
                return res.status(400).send({
                    message: 'Each area value must be a number.',
                });
            }

            for (let item of area) {
                const areaResponse = await new AreaRepo().get(item);

                // If area does not exist, return an error
                if (!areaResponse) {
                    return res.status(404).send({
                        message: `Area with ID ${item} does not exist.`,
                    });
                }
            }

            const updatedRegion = await new RegionRepo().update(id as number, { ...updateData, updatedBy: user_id });
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        updatedRegion
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
            const id = get(req.params, "id", 0);
            const existingRegion = await new RegionRepo().get(id as number);

            if (!existingRegion) {
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
                        existingRegion
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
            const ids = get(req.body, "ids", "");
            const deletedCount = await new RegionRepo().delete(ids);

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
