import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { TEditProfile } from "../../../types";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { Admin } from '../models/profile';

export default class ProfileController {
    static async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req, "user_id", "");
            const getProfileData = await new Admin().get(id as number);

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

            let payload: TEditProfile = {
                full_name,
                contact_number,
                phone_code,
                address,
            };

            const profileUpdate = await new Admin().editProfile(id, payload);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        profileUpdate
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
