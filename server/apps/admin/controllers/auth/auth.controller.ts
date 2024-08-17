import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import * as bcrypt from "bcrypt";
import AuthService from "./auth.service";
import {
    sendResponse,
    createAccessToken,
    createRefreshToken,
    createUserResponse,
} from "apps/admin/helpers";
import { RESPONSE_TYPE, ERROR_MESSAGE, SUCCESS_MESSAGE } from "apps/admin/constants";

export default class AuthController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const email = get(req?.body, "email", "");
            const password = get(req?.body, "password", "");
            const ip = req.socket.localAddress;
            const user = await AuthService.getAdminByEmail(email);

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

            await AuthService.updateRefreshToken({
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
}
