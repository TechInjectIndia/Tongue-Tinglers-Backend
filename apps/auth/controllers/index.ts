import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import * as bcrypt from "bcrypt";
import {
    sendResponse,
    createPassword,
    createAccessToken,
    createRefreshToken,
    createUserResponse,
} from "../../../libraries";
import { RESPONSE_TYPE, ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../constants";
import { Auth } from '../models';

export default class AuthController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const email = get(req?.body, "email", "");
            const password = get(req?.body, "password", "");
            const ip = req.socket.localAddress;
            const user = await new Auth().getUserByEmail(email);

            if (isEmpty(user)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.ADMIN_NOT_EXISTS
                        )
                    );
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.INVALID_LOGIN_REQUEST
                        )
                    );
            }

            const accessToken = createAccessToken({
                id: user.id,
                email: user.email,
            });

            const refreshToken = createRefreshToken({
                email: user.email,
            });

            await new Auth().updateRefreshToken({
                user_id: user.id,
                refresh_token: refreshToken,
                last_login_at: new Date(),
                last_login_ip: ip,
            });

            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.LOGGED_IN, {
                    user: createUserResponse(user),
                    accessToken,
                    refreshToken,
                })
            );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async changePassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const user_id = get(req, "user_id", '');
            const old_password = get(req?.body, "old_password", "");
            const new_password = get(req?.body, "new_password", "");

            const user = await new Auth().getUserPassword(user_id);
            const validPassword = await bcrypt.compare(
                old_password,
                user.password
            );
            if (!validPassword) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.INVALID_OLD_PASSWORD
                        )
                    );
            }

            const hashedPassword = await createPassword(new_password);
            await new Auth().changePassword({
                user_id,
                password: hashedPassword,
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.PASSWORD_UPDATED
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
