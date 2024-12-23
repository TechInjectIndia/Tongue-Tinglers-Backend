import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, uploadSingleFileToFirebase } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { ProfileRepo } from '../models/profile';

export default class ProfileController {
    static async uploadImage(req: Request, res: Response, next: NextFunction) {
        try {
            const moduleName = 'customer'
            await uploadSingleFileToFirebase(req as any, moduleName as string)
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPLOADED,
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
            const id = get(req, "user_id");
            const getProfileData = await new ProfileRepo().get(id as number);

            if (isEmpty(getProfileData)) {
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
                        getProfileData
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
            const id = get(req, "user_id");
            const payload = req?.body;

            await new ProfileRepo().update(id as number, payload);
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
