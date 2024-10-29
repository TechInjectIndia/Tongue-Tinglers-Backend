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
import jwt from "jsonwebtoken";
import { CONFIG } from "../../../config";
import { verifyJwtToken, verifyFirebaseToken, verifyAndUpdatePassword } from "../../../libraries";

export default class AuthController {
    static async createPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const token = get(req.body, "token");
            const newPassword = get(req.body, "new_password");

            if (!token) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.TOKEN_NOT_PROVIDED
                        )
                    );
            }

            const jwtPayload = verifyJwtToken(token);
            if (!jwtPayload) {
                return res.status(401).send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        ERROR_MESSAGE.INVALID_TOKEN
                    )
                );
            }

            const firebaseUser = await new Auth().getUserByFirebaseId(token);
            if (!firebaseUser) {
                return res.status(404).send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        ERROR_MESSAGE.INVALID_TOKEN
                    )
                );
            }

            const firebaseUserId = firebaseUser.firebaseUid;
            const result = await verifyAndUpdatePassword(firebaseUserId, newPassword);

            if (result.success) {
                const payloadUser = await new Auth().removePasswordToken(token);
                console.log('payloadUser', payloadUser)
                return res.status(200).send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.PASSWORD_CREATED
                    )
                );
            } else {
                return res.status(400).send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        result.message
                    )
                );
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send({
                message: "Error creating password: " + err.message,
            });
        }
    }

    /**
    * Verifies the password reset token to ensure it is valid and not expired.
    * @param req Express Request
    * @param res Express Response
    * @param next Express NextFunction
    */
    static async verifyPasswordToken(req: Request, res: Response, next: NextFunction) {
        try {
            // Extract token from the request body
            const token = get(req?.body, "token", "");
            if (!token) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.TOKEN_NOT_PROVIDED
                        )
                    );
            }

            // Verify the token using JWT
            jwt.verify(token, CONFIG.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res
                        .status(401)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                ERROR_MESSAGE.INVALID_OR_EXPIRED_TOKEN
                            )
                        );
                }

                // If token is valid, send a success response
                return res
                    .status(200)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.SUCCESS,
                            SUCCESS_MESSAGE.TOKEN_VALID
                        )
                    );
            });
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

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
                lastLoginAt: new Date(),
                lastLoginIp: ip,
            });

            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.LOGGED_IN, {
                    user: createUserResponse(user),
                    accessToken,
                    refreshToken,
                })
            );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async changePassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const user_id = get(req, "user_id",);
            const old_password = get(req?.body, "old_password", "");
            const new_password = get(req?.body, "new_password", "");

            const user = await new Auth().getUserPassword(user_id as number);
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
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
