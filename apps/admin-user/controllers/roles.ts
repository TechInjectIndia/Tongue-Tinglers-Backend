import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { RolesRepo } from '../models/roles';
const { Op } = require("sequelize");

export default class RolesController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const name = get(req?.body, "name", "");
            const active = get(req?.body, "active", 1);
            const permissions = get(req?.body, "role_permissions", '');
            const description = get(req?.body, "description", '');

            const existingRole = await new RolesRepo().getRoleByName(name);
            if (existingRole) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.ROLE_EXISTS
                        )
                    );
            }

            const role = await new RolesRepo().create({ name, active, description, role_permissions: permissions });
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ROLE_CREATED,
                        role
                    )
                );
        } catch (err) {
            console.log(err)
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
            sorting = sorting.toString().split(" ");

            const roles = await new RolesRepo().list({
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
                        SUCCESS_MESSAGE.ROLES_FETCHED,
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

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);
            const name = get(req?.body, "name", "");
            const active = get(req?.body, "active", 1);
            const permissions = get(req?.body, "role_permissions", '');
            const description = get(req?.body, "description", '');

            // let role_permissions: any = '';
            // if (permissions != '') {
            //     role_permissions = JSON.parse(permissions);
            // }
            const existingRole = await new RolesRepo().get(id as number);

            if (isEmpty(existingRole)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.ROLE_NOT_EXISTS
                        )
                    );
            }

            const role = await new RolesRepo().update(id as number, { name, active, description, role_permissions: permissions });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ROLE_UPDATED,
                        role
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);
            const role = await new RolesRepo().get(id as number);

            if (isEmpty(role)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.ROLE_NOT_EXISTS
                        )
                    );
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ROLE_FETCHED,
                        role
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async deleteRole(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req?.body, "ids", "");

            const isAssigned = await new RolesRepo().getRoleAssigneeByRoleId(ids);
            if (!isEmpty(isAssigned)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.ROLE_ASSIGNED_TO_ADMIN
                        )
                    );
            }

            const role = await new RolesRepo().deleteRole(ids);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ROLE_DELETED,
                        role
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
