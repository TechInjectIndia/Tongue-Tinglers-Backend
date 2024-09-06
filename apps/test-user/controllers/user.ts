import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, createPassword, createFirebaseUser } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { AdminRepo } from '../models/user';
import { Auth } from '../../auth/models';
import { USER_TYPE } from '../../../interfaces';

export default class AdminController {
    static async addAdmin(req: Request, res: Response, next: NextFunction) {
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
                            ERROR_MESSAGE.ADMIN_EXISTS
                        )
                    );
            }

            const firebaseUser = await createFirebaseUser({
                email: payload.email,
                emailVerified: true,
                phoneNumber: payload.phoneNumber,
                password: 'Test@123',
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
                type: USER_TYPE.ADMIN,
                firebaseUid: firebaseUser.uid
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
}
