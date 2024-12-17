import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../../constants";
import { FranchiseOrderRepo } from '../../models/franchise/orders';

export default class OrderController {

    static async getOrderStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);
            const existingLead = await new FranchiseOrderRepo().getOrderStatusById(id as number);

            if (isEmpty(existingLead)) {
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
                        existingLead
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = <number>get(req, 'user_id', );
            if(!user_id || isNaN(user_id)) throw Error('Missing user_id or isNaN');

            let size = parseInt(<string>get(req.query, "size", '10'));
            if (isNaN(size)) size = 10;
            let skip = parseInt(<string>get(req.query, "skip", '1'));
            if (isNaN(skip)) skip = 1;
            const search = <string>get(req.query, "search", '');
            const trashOnly = <string>get(req.query, "trashOnly", '');
            const sorting = <string>get(req.query, "sorting", "id DESC");

            const Orders = await new FranchiseOrderRepo().list({
                offset: skip,
                limit: size ,
                search: search,
                sorting: sorting,
                trashOnly: trashOnly ,
                user_id: user_id
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        Orders
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
            const id = get(req?.params, "id", 0);
            const Order = await new FranchiseOrderRepo().getOrderById(id as number);

            if (isEmpty(Order)) {
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
                        Order
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
