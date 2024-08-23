import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { TEditFranchisee, TEditFranchiseeProfile } from "../../../types";
import { sendResponse, createPassword } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { Admin } from '../models';

export default class FranchiseeController {
    static async getFranchisees(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.split(" ");

            const Franchisees = await new Admin().getFranchisees({
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
                        Franchisees
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async addFranchisee(req: Request, res: Response, next: NextFunction) {
        try {
            const email = get(req?.body, "email", "");
            const password = get(req?.body, "password", "");
            const full_name = get(req?.body, "full_name", "");
            const contact_number = get(req?.body, "contact_number", "");
            const phone_code = get(req?.body, "phone_code", "");
            const role = get(req?.body, "role", 0);
            const address = get(req?.body, "address", "");
            const active = get(req?.body, "active", 1);

            const existingFranchisee = await new Admin().getFranchiseeByEmail(email);
            if (existingFranchisee) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.EXISTS
                        )
                    );
            }

            const hashedPassword = await createPassword(password);
            await new Admin().addFranchisee({
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
                        SUCCESS_MESSAGE.CREATED
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async editFranchisee(req: Request, res: Response, next: NextFunction) {
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

            let payload: TEditFranchisee = {
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

            await new Admin().editFranchisee(id, payload);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async deleteFranchisee(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req?.body, "ids", "");

            await new Admin().deleteFranchisee(ids);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getFranchisee(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");
            const existingFranchisee = await new Admin().getFranchiseeById(id as number);

            if (isEmpty(existingFranchisee)) {
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
                        existingFranchisee
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

            let payload: TEditFranchiseeProfile = {
                full_name,
                contact_number,
                phone_code,
                address,
            };

            await new Admin().editProfile(id, payload);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
