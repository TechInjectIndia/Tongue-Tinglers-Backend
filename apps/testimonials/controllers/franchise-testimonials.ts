import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { FranchiseTestimonialsRepo } from '../models/franchise-testimonials';
import { TESTIMONIAL_ITEM_TYPE } from '../../../interfaces';
import { ProductRepo } from '../../ecommerce/models/products';
import { AdminRepo as FranchiseRepo } from '../../admin-user/models/user';

export default class FranchiseTestimonialsController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const item_type = get(req?.body, "item_type", '');
            const item_id = get(req?.body, "item_id", "");
            const user_id = get(req, 'user_id', 0);
            const currentDate = new Date();

            let checkIfExist: any;
            let franchiseOrProduct = TESTIMONIAL_ITEM_TYPE.PRODUCT
            if (item_type == TESTIMONIAL_ITEM_TYPE.PRODUCT) {
                checkIfExist = await new ProductRepo().get(item_id as number);
            } else if (item_type == TESTIMONIAL_ITEM_TYPE.FRANCHISE) {
                checkIfExist = await new FranchiseRepo().get(item_id as number);
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

            const payload = { ...req?.body, user_id: user_id, date_submitted: currentDate };
            const Testimonials = await new FranchiseTestimonialsRepo().create(payload);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        Testimonials
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const rating = get(req?.query, "rating", 0);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.split(" ");

            const getList = await new FranchiseTestimonialsRepo().list({
                offset: parseInt(skip),
                limit: parseInt(size),
                search,
                sorting,
                rating,
                trashOnly
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        getList
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
            let getAttributes: any = ['*'];
            const whereName = 'id'
            const whereVal = id;
            const existingTestimonials = await new FranchiseTestimonialsRepo().getTestimonialsByAttr(whereName, whereVal, getAttributes);

            if (isEmpty(existingTestimonials)) {
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
                        existingTestimonials
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}