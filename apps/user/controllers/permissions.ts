import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { PermissionsRepo } from '../models/permissions';

export default class PermissionsController {
    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);
            const isExistPermission = await new PermissionsRepo().get(id as number);
            if (!isExistPermission) {
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
                        isExistPermission
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

            const roles = await new PermissionsRepo().list({
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
                        roles
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const name = get(req?.body, "name", "");
            const active = get(req?.body, "active", 1);
            const description = get(req?.body, "description", 1);
            const existingPermission = await new PermissionsRepo().getPermissionByName(name);

            if (existingPermission) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.EXISTS
                        )
                    );
            }

            const Permission = await new PermissionsRepo().create({ name, active, description });
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        Permission
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
            const id = get(req?.params, "id", 0) as number;
            const { name, description, active } = req.body;

            const checkPermissionExist = await new PermissionsRepo().checkPermissionExist(name, id);
            if (checkPermissionExist) {
                return res.status(409).send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.EXISTS));
            }

            const [affectedCount] = await new PermissionsRepo().update(id, { name, description, active });
            if (affectedCount === 0) {
                return res.status(404).send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS));
            }

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPDATED));
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({ message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }
}
