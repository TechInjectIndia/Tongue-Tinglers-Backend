import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { Admin } from '../models/roles';
const { Op } = require("sequelize");

export default class RolesController {
    static async addRole(req: Request, res: Response, next: NextFunction) {
        try {
            const name = get(req?.body, "name", "");
            const active = get(req?.body, "active", 1);
            const permissions = get(req?.body, "role_permissions", {});

            let role_permissions: any = '';
            if (permissions != '') {
                role_permissions = JSON.parse(permissions);
            }
            const existingRole = await new Admin().getRoleByName(name);
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

            const role = await new Admin().addRole({ name, active, role_permissions });
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

    static async listRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.split(" ");

            const roles = await new Admin().listRoles({
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

    static async editRole(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");
            const name = get(req?.body, "name", "");
            const active = get(req?.body, "active", 1);
            const permissions = get(req?.body, "role_permissions", {});

            let role_permissions: any = '';
            if (permissions != '') {
                role_permissions = JSON.parse(permissions);
            }
            const existingRole = await new Admin().getRoleById(id as number);

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

            const role = await new Admin().editRole(id, { name, active, role_permissions });

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
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getRole(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");
            const role = await new Admin().getRoleById(id as number);

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

            const isAssigned = await new Admin().getRoleAssigneeByRoleId(ids);
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

            const role = await new Admin().deleteRole(ids);

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
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
