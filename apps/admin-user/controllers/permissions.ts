import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { Admin } from '../models/permissions';

export default class PermissionsController {    
    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");
            const isExistPermission = await new Admin().getPermissionById(id as number);
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
                        SUCCESS_MESSAGE.CREATED,
                        isExistPermission
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
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
            sorting = sorting.split(" ");

            const roles = await new Admin().listPermissions({
                offset: parseInt(skip),
                limit: parseInt(size),
                search,
                sorting,
                trashOnly
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
            const existingPermission = await new Admin().getPermissionByName(name);

            if (!isEmpty(existingPermission)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.EXISTS
                        )
                    );
            }

            const Permission = await new Admin().addPermission({ name, active });
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
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");
            const name = get(req?.body, "name", "");
            const active = get(req?.body, "active", 1);

            const existingPermission = await new Admin().getPermissionById(id as number);

            if (isEmpty(existingPermission)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            const Permission = await new Admin().editPermission(id, { name, active });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        Permission
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req?.body, "ids", "");

            const isAssigned = await new Admin().getPermissionAssigneeByPermissionId(ids);
            if (!isEmpty(isAssigned)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            const Permission = await new Admin().deletePermission(ids);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        Permission
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
