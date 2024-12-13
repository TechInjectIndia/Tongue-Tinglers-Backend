import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../../constants";
// import { WebProductRepo } from '../../models/web/products';

export default class webProductsController {
    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            // const Products = await new WebProductRepo().list({
            //     offset: skip as number,
            //     limit: size as number,
            //     search: search as string,
            //     sorting: sorting,
            //     trashOnly: trashOnly as string
            // });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        // Products
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const slug = get(req?.params, "slug", "");
            // const Product = await new WebProductRepo().getProductBySlug(slug as string);

            // if (isEmpty(Product)) {
            //     return res
            //         .status(400)
            //         .send(
            //             sendResponse(
            //                 RESPONSE_TYPE.ERROR,
            //                 ERROR_MESSAGE.NOT_EXISTS
            //             )
            //         );
            // }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        // Product
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getByType(req: Request, res: Response, next: NextFunction) {
        try {
            const limit = get(req?.query, "limit", 500);
            const type = get(req?.query, "type");

            // const Products = await new WebProductRepo().getProductByTag(type as string, limit as number);

            // if (isEmpty(Products)) {
            //     return res
            //         .status(400)
            //         .send(
            //             sendResponse(
            //                 RESPONSE_TYPE.ERROR,
            //                 ERROR_MESSAGE.NOT_EXISTS
            //             )
            //         );
            // }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        // Products
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async search(req: Request, res: Response, next: NextFunction) {
        try {
            const search = get(req?.query, "search", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            // const Products = await new WebProductRepo().search({
            //     search: search as string,
            //     sorting,
            // });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        // Products
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