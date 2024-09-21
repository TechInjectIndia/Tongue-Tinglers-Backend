import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { TestimonialsRepo } from '../models/web-testimonials';

export default class WebTestimonialsController {
    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const rating = get(req?.query, "rating", 0);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            const getList = await new TestimonialsRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
                trashOnly: trashOnly as string,
                rating: rating as number
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
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}