import { Request, Response, NextFunction } from 'express';
import { UserAddressRepo } from '../models/UserAddressRepo';
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { get } from "lodash";

export default class UserAddressController {
    /**
     * Create a new user address
     */
    static async createUserAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = get(req, 'user_id', '');
            const payload = { ...req?.body, userId: userId };
            const newUserAddress = await new UserAddressRepo().create(payload);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        `Address ${SUCCESS_MESSAGE.CREATED}`,
                        newUserAddress
                    )
                );
        } catch (error) {
            next(error);
        }
    }

    static async getActiveAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = get(req, 'user_id', '');
            const addressResponse = await new UserAddressRepo().getActiveAddress(userId);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        `Address ${SUCCESS_MESSAGE.CREATED}`,
                        addressResponse
                    )
                );
        } catch (error) {
            next(error);
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = get(req, 'user_id', '');
            const vendors = await new UserAddressRepo().list(userId as number);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        vendors
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    /**
     * Get a user address by ID
     */
    static async getUserAddressById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = get(req, 'user_id', '');
            const id = get(req.params, 'id', '');
            console.log('userId', userId, 'id', id);
            const userAddress = await new UserAddressRepo().findById(id as number, userId as number);

            if (!userAddress) {
                return res.status(404)
                    .status(404)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            `Address ${ERROR_MESSAGE.NOT_EXISTS}`,
                        )
                    );
            }

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    `Address ${SUCCESS_MESSAGE.FETCHED}`,
                    userAddress
                )
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update a user address by ID
     */
    static async updateUserAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = get(req, 'user_id', '');
            const { id } = req.params;
            const payload = { ...req?.body, userId: userId };

            const updatedUserAddress = await new UserAddressRepo().updateById(id as number, payload);
            if (!updatedUserAddress) {
                return res.status(404)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            `Address ${ERROR_MESSAGE.NOT_EXISTS}`,
                        )
                    );;
            }

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    `Address ${SUCCESS_MESSAGE.UPDATED}`,
                    updatedUserAddress
                ));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete a user address by ID
     */
    static async deleteUserAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deleted = await new UserAddressRepo().deleteById(id as number);

            if (!deleted) {
                return res.status(404)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            `Address ${ERROR_MESSAGE.NOT_EXISTS}`,
                        )
                    );
            }

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    `Address ${SUCCESS_MESSAGE.DELETED}`,
                    null
                ));
        } catch (error) {
            next(error);
        }
    }
}