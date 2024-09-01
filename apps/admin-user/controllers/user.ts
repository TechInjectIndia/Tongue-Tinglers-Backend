import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, createPassword } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { Admin } from '../models/user';
import { Auth } from '../../auth/models';
import { USER_TYPE } from '../../../interfaces';

export default class AdminController {
    static async getAdmins(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.split(" ");

            const admins = await new Admin().getAdmins({
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
            const payload = req?.body;

            const existingAdmin = await new Auth().getUserByEmail(payload.email);
            if (existingAdmin) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.ADMIN_EXISTS
                        )
                    );
            }

            const hashedPassword = await createPassword(payload.password);
            await new Admin().addAdmin({
                ...payload,
                password: hashedPassword,
                 USER_TYPE.ADMIN
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
            let payload = req?.body;

            if (payload.password) {
                const hashedPassword = await createPassword(payload.password);
                payload = { ...payload, password: hashedPassword };
            }

            await new Admin().editAdmin(id, payload);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ADMIN_UPDATED
                    )
                );
        } catch (err) {
            console.log(err)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async deleteAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req?.body, "ids", "");

            await new Admin().deleteAdmin(ids);

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
            const existingAdmin = await new Admin().getAdminById(id as number);

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
            console.log(err)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async editProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req, "user_id", "");
            const payload = req?.body;

            await new Admin().editProfile(id, payload);
            
            return res
            .status(200)
            .send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.ADMIN_UPDATED
                )
            );
        } catch (err) {
            console.log(err)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
