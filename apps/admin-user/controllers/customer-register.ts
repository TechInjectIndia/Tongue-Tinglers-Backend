import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, createPassword, createFirebaseUser } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { CustomerRegisterRepo } from '../models/customer-register';
import { Auth } from '../../auth/models';
import { USER_TYPE, USER_STATUS } from '../../../interfaces';

export default class CustomerRegisterController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            let payload = { ...req?.body };

            const existingCustomer = await new Auth().getUserByEmail(payload.email);
            if (existingCustomer) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.CUSTOMER_EXISTS
                        )
                    );
            }

            const firebaseUser = await createFirebaseUser({
                email: payload.email,
                emailVerified: true,
                phoneNumber: null,
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
            await new CustomerRegisterRepo().create({
                ...payload,
                password: hashedPassword,
                type: USER_TYPE.CUSTOMER,
                status: USER_STATUS.INACTIVE,
                role: 2,
                firebaseUid: firebaseUser.uid
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CUSTOMER_CREATED
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
