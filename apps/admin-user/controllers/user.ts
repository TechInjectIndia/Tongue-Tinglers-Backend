import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import {
    sendResponse,
    createPassword,
    createFirebaseUser,
    sendEmail,
    EMAIL_HEADING,
    getEmailTemplate,
    EMAIL_TEMPLATE,
} from "../../../libraries";
import {
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
} from "../../../constants";
import { AdminRepo } from "../models/user";
import { Auth } from "../../auth/models";
import { USER_TYPE } from "../../../interfaces";
import { CONFIG } from "../../../config";

export default class AdminController {
    static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            const admins = await new AdminRepo().getAllUsers({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
                trashOnly: trashOnly as string,
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        admins
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
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
            sorting = sorting.toString().split(" ");

            const admins = await new AdminRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
                trashOnly: trashOnly as string,
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
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async addAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, "user_id", "");
            const payload = { ...req?.body, createdBy: user_id };

            const existingAdmin = await new Auth().getUserByEmail(
                payload.email
            );
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

            const firebaseUser = await createFirebaseUser({
                email: payload.email,
                emailVerified: true,
                phoneNumber: null,
                password: payload.password,
                disabled: false,
            });

            if (!firebaseUser?.success) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, firebaseUser?.uid));
            }

            const hashedPassword = await createPassword(payload.password);
            await new AdminRepo().create({
                ...payload,
                password: hashedPassword,
                type: USER_TYPE.MASTER_FRANCHISE,
                firebaseUid: firebaseUser.uid,
            });

            try {
                const emailContent = await getEmailTemplate(
                    EMAIL_TEMPLATE.WELCOME_ADMIN_USER,
                    {
                        email: payload.email,
                        link: "some-link",
                    }
                );

                const mailOptions = {
                    to: payload.email,
                    subject: EMAIL_HEADING.WELCOME_ADMIN_USER,
                    templateParams: {
                        heading: EMAIL_HEADING.WELCOME_ADMIN_USER,
                        description: emailContent,
                    },
                };

                await sendEmail(
                    mailOptions.to,
                    mailOptions.subject,
                    mailOptions.templateParams
                );
            } catch (emailError) {
                console.error("Error sending email:", emailError);
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ADMIN_CREATED
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async addProspectUser(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const user_id = get(req, "user_id", "");
            const payload = { ...req?.body, createdBy: user_id };

            const existingAdmin = await new Auth().getUserByEmail(
                payload.email
            );
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

            const firebaseUser = await createFirebaseUser({
                email: payload.email,
                emailVerified: true,
                phoneNumber: null,
                password: payload.password,
                disabled: false,
            });

            if (!firebaseUser?.success) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, firebaseUser?.uid));
            }

            const hashedPassword = await createPassword(payload.password);
            await new AdminRepo().create({
                ...payload,
                password: hashedPassword,
                type: USER_TYPE.PROSPECT,
                firebaseUid: firebaseUser.uid,
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
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async editAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);
            const user_id = get(req, "user_id", 0);
            let payload = { ...req?.body, updatedBy: user_id };

            // if (payload.password) {
            //     const hashedPassword = await createPassword(payload.password);
            //     payload = { ...payload, password: hashedPassword };
            // }

            await new AdminRepo().update(id as string, payload);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ADMIN_UPDATED
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async deleteAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, "user_id", 0);
            const ids = get(req?.body, "ids", "");

            await new AdminRepo().delete(ids, user_id);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ADMIN_DELETED
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id");
            const existingAdmin = await new AdminRepo().get(id as string);
            if (!existingAdmin?.id) {
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
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async editProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req, "user_id");
            const payload = req?.body;

            await new AdminRepo().updateProfile(id, payload);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.ADMIN_UPDATED
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
