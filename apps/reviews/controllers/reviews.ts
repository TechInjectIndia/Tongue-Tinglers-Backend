import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { ReviewsModel } from '../models/reviews';
import { ProductModel } from '../../ecommerce/models/products';

export default class ReviewsController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createReviews = req?.body;
            const user_id = get(req, "user_id", "");
            createReviews.user_id = user_id
            const item_type = get(req?.body, "item_type", '');

            if (item_type == 'product') {
                const item_id = get(req?.body, "item_id", "");
                const Product = await new ProductModel().getProductById(item_id as number);

                if (isEmpty(Product)) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                `Product ${ERROR_MESSAGE.NOT_EXISTS}`
                            )
                        );
                }
            }

            const Reviews = await new ReviewsModel().add(createReviews);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        Reviews
                    )
                );
        } catch (err) {
            console.log(err)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.split(" ");

            const Reviewss = await new ReviewsModel().list({
                offset: parseInt(skip),
                limit: parseInt(size),
                search,
                sorting,
                trashOnly
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        Reviewss
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");
            let getAttributes: any = ['*'];
            const whereName = 'id'
            const whereVal = id;
            const existingReviews = await new ReviewsModel().getReviewsByAttr(whereName, whereVal, getAttributes);

            if (isEmpty(existingReviews)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            const updateReviews = req?.body;
            delete updateReviews.id
            const Reviews = await new ReviewsModel().update(id, updateReviews);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        Reviews
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");

            let getAttributes: any = '';
            const whereName = 'id'
            const whereVal = id;
            const existingReviews = await new ReviewsModel().getReviewsByAttr(whereName, whereVal, getAttributes);

            if (isEmpty(existingReviews)) {
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
                        existingReviews
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req?.body, "ids", "");

            const Reviews = await new ReviewsModel().delete(ids);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        Reviews
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

}