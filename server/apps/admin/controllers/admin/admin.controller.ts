import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import AdminService from "./admin.service";
import { TEditAdmin, TEditAdminProfile } from "./admin.types";
import { sendResponse, createPassword } from "apps/admin/helpers";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "apps/admin/constants";
import AuthService from "../auth/auth.service";

export default class AdminController {
    static async getRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.split(" ");

            const roles = await AdminService.getRoles({
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
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async addRole(req: Request, res: Response, next: NextFunction) {
        try {
            const name = get(req?.body, "name", "");
            const active = get(req?.body, "active", 1);
            const existingRole = await AdminService.getRoleByName(name);

            if (!isEmpty(existingRole)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.ROLE_EXISTS
                        )
                    );
            }

            const role = await AdminService.addRole({ name, active });

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

            const existingRole = await AdminService.getRoleById(id as number);

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

            const role = await AdminService.editRole(id, { name, active });

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
            const role = await AdminService.getRoleById(id as number);

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
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async deleteRole(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req?.body, "ids", "");

            const isAssigned = await AdminService.getRoleAssigneeByRoleId(ids);
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

            const role = await AdminService.deleteRole(ids);

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

    static async getAdmins(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.split(" ");

            const admins = await AdminService.getAdmins({
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
                        SUCCESS_MESSAGE.ADMINS_FETCHED,
                        admins
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async addAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const email = get(req?.body, "email", "");
            const password = get(req?.body, "password", "");
            const full_name = get(req?.body, "full_name", "");
            const contact_number = get(req?.body, "contact_number", "");
            const phone_code = get(req?.body, "phone_code", "");
            const role = get(req?.body, "role", 0);
            const address = get(req?.body, "address", "");
            const active = get(req?.body, "active", 1);

            const existingAdmin = await AuthService.getAdminByEmail(email);

            if (!isEmpty(existingAdmin)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.ADMIN_EXISTS
                        )
                    );
            }

            const hashedPassword = await createPassword(password);

            await AdminService.addAdmin({
                email,
                password: hashedPassword,
                full_name,
                contact_number,
                phone_code,
                role,
                address,
                active,
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ADMIN_CREATED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async editAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");
            const email = get(req?.body, "email", "");
            const password = get(req?.body, "password", "");
            const full_name = get(req?.body, "full_name", "");
            const contact_number = get(req?.body, "contact_number", "");
            const phone_code = get(req?.body, "phone_code", "");
            const role = get(req?.body, "role", 0);
            const address = get(req?.body, "address", "");
            const active = get(req?.body, "active", 1);

            let payload: TEditAdmin = {
                email,
                full_name,
                contact_number,
                phone_code,
                role,
                address,
                active,
            };

            if (password) {
                const hashedPassword = await createPassword(password);
                payload = { ...payload, password: hashedPassword };
            }

            await AdminService.editAdmin(id, payload);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ADMIN_UPDATED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async deleteAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req?.body, "ids", "");

            await AdminService.deleteAdmin(ids);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ADMIN_DELETED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");
            const existingAdmin = await AdminService.getAdminById(id as number);

            if (isEmpty(existingAdmin)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.ADMIN_NOT_EXISTS
                        )
                    );
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ADMIN_FETCHED,
                        existingAdmin
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async editProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req, "user_id", "");
            const full_name = get(req?.body, "full_name", "");
            const contact_number = get(req?.body, "contact_number", "");
            const phone_code = get(req?.body, "phone_code", "");
            const address = get(req?.body, "address", "");

            let payload: TEditAdminProfile = {
                full_name,
                contact_number,
                phone_code,
                address,
            };

            await AdminService.editProfile(id, payload);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ADMIN_UPDATED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
