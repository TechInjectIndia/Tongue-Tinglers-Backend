import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, createPassword, createFirebaseUser } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { FranchiseRepo } from '../models/franchise';
import { AdminRepo } from '../models/user';
import { Auth } from '../../auth/models';
import { USER_TYPE } from '../../../interfaces';

export default class FranchiseController {
    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            const admins = await new FranchiseRepo().list({
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
                        SUCCESS_MESSAGE.FRANCHISE_FETCHED,
                        admins
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    
    static async createFranchiseFromLead(req: Request, res: Response, next: NextFunction) {
        
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, 'user_id', 0);
            const payload = { ...req?.body, createdBy: user_id };

            const existingAdmin = await new Auth().getUserByEmail(payload.email);
            if (existingAdmin) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.FRANCHISE_EXISTS
                        )
                    );
            }

            const firebaseUser = await createFirebaseUser({
                email: payload.email,
                emailVerified: true,
                phoneNumber: payload.phoneNumber,
                password: payload.password,
                disabled: false
            });

            if (!firebaseUser?.success) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            firebaseUser?.uid
                        )
                    );
            }

            const hashedPassword = await createPassword(payload.password);
            await new AdminRepo().create({
                ...payload,
                password: hashedPassword,
                type: USER_TYPE.FRANCHISE,
                firebaseUid: firebaseUser.uid
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FRANCHISE_CREATED
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
            const id = get(req?.params, "id", 0);
            const user_id = get(req, 'user_id', 0);
            let payload = { ...req?.body, updatedBy: user_id };

            await new FranchiseRepo().update(id as number, payload);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FRANCHISE_UPDATED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async deleteFranchise(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, 'user_id', 0);
            const ids = get(req?.body, "ids", "");

            await new FranchiseRepo().delete(ids, user_id);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FRANCHISE_DELETED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);
            const existingAdmin = await new FranchiseRepo().get(id as number);
            if (isEmpty(existingAdmin)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.FRANCHISE_NOT_EXISTS
                        )
                    );
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FRANCHISE_FETCHED,
                        existingAdmin
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
