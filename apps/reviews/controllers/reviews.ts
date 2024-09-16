import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { ReviewsRepo } from '../models/reviews';
import { ProductRepo } from '../../ecommerce/models/products';
import { AdminRepo as FranchiseRepo } from '../../admin-user/models/user';
import { TESTIMONIAL_ITEM_TYPE } from '../../../interfaces';

export default class ReviewsController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const item_type = get(req?.body, "item_type", '');
            const item_id = get(req?.body, "item_id", "");
            const user_id = get(req, 'user_id', 0);

            let checkIfExist: any;
            let franchiseOrProduct = TESTIMONIAL_ITEM_TYPE.PRODUCT
            if (item_type == TESTIMONIAL_ITEM_TYPE.PRODUCT) {
                checkIfExist = await new ProductRepo().get(item_id as number);
            } else if (item_type == TESTIMONIAL_ITEM_TYPE.FRANCHISE) {
                checkIfExist = await new FranchiseRepo().get(item_id as string);
                franchiseOrProduct = TESTIMONIAL_ITEM_TYPE.FRANCHISE
            }
            if (isEmpty(checkIfExist)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            `${franchiseOrProduct} ${ERROR_MESSAGE.NOT_EXISTS}`
                        )
                    );
            }

            const payload = { ...req?.body, user_id: user_id };
            const Reviews = await new ReviewsRepo().create(payload);
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
            sorting = sorting.toString().split(" ");

            const Reviewss = await new ReviewsRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
                trashOnly: trashOnly as string
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
            const id = get(req?.params, "id", 0);
            let getAttributes: any = ['*'];
            const whereName = 'id'
            const whereVal = id;
            const existingReviews = await new ReviewsRepo().getReviewsByAttr(whereName, whereVal, getAttributes);

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
            const Reviews = await new ReviewsRepo().update(id as number, updateReviews);

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
            const id = get(req?.params, "id", 0);

            let getAttributes: any = '';
            const whereName = 'id'
            const whereVal = id;
            const existingReviews = await new ReviewsRepo().getReviewsByAttr(whereName, whereVal, getAttributes);

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

            const Reviews = await new ReviewsRepo().delete(ids);
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