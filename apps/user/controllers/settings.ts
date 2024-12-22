import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { TPayloadSettings } from "../../../types";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { SettingsRepo } from '../models/settings';

export default class SettingsController {
    static async getSettings(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req, "id", 0);
            const existingFranchisee = await new SettingsRepo().get(id as number);
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
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async editSettings(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req, "id", 0);
            const payload = req?.body;

            await new SettingsRepo().editSettings(id as number, payload);
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
