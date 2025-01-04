import { get } from "lodash";
import RepoProvider from "../../RepoProvider";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE } from "../../../constants";
import { Request, Response } from "express";

import {
    BaseProductOptions,
    parsedProductOptions, ProductOptions
} from "apps/product/interface/ProductOptions";

export default class ProductOptionsController {
    static async createProductOptions(req: Request, res: Response) {
        try {
            const payload:any = req?.body;
            const user_id = get(req, "user_id", 0);

            const productOptionsDetails = await RepoProvider.productOptionsRepo.create(payload, user_id);
            return res.status(200)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.SUCCESS,
                            SUCCESS_MESSAGE.CREATED,
                            productOptionsDetails,
                        ),
                    );

        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while creating product options.'),
            );
        }
    }

    static async updateProductOptions(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const payload: ProductOptions = req.body;
            payload.id = id;
            const user_id = get(req, "user_id", 0);
            payload.updatedBy = user_id
            const productOption: ProductOptions = await RepoProvider.productOptionsRepo.update(payload);
            return res.status(200)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.SUCCESS,
                            SUCCESS_MESSAGE.UPDATED,
                            productOption,
                        ),
                    );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while fetching products.'),
            );
        }
    }

    static async getProductOptionsById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const productOptions = await RepoProvider.productOptionsRepo.getById(id);
            return res.status(200)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.SUCCESS,
                            SUCCESS_MESSAGE.FETCHED,
                            parsedProductOptions(productOptions),
                        ),
                    );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while fetching products.'),
            );
        }
    }

    static async updatePrice(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const payload:any = req?.body;
            payload.id = id;
            const user_id = get(req, "user_id", 0);
            const productOptions: BaseProductOptions = {
                ...payload,
                updatedBy: user_id,
            };
            const productOptionsDetails = await RepoProvider.productOptionsRepo.updatePrice(productOptions);
            return res.status(200)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.SUCCESS,
                            SUCCESS_MESSAGE.UPDATED,
                            productOptionsDetails,
                        ),
                    );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while update price of product options.'),
            );
        }
    }

    static async updateStock(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const payload:any = req?.body;
            payload.id = id;
            const user_id = get(req, "user_id", 0);
            const productOptions: BaseProductOptions = {
                ...payload,
                updatedBy: user_id,
            };
            const productOptionsDetails = await RepoProvider.productOptionsRepo.updateStock(productOptions);
            return res.status(200)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.SUCCESS,
                            SUCCESS_MESSAGE.UPDATED,
                            productOptionsDetails,
                        ),
                    );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while update stock of product options.'),
            );
        }
    }

    static async updateStatus(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const payload = req.body;
            payload.id = id;
            const productOptions: BaseProductOptions = await RepoProvider.productOptionsRepo.updateStatus(payload);
            return res.status(200)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.SUCCESS,
                            SUCCESS_MESSAGE.UPDATED,
                            productOptions,
                        ),
                    );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while fetching products.'),
            );
        }
    }

    static async getByProductId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const productOptions: ProductOptions[] = await RepoProvider.productOptionsRepo.getByProductId(id);
            return res.status(200)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.SUCCESS,
                            SUCCESS_MESSAGE.FETCHED,
                            productOptions,
                        ),
                    );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while fetching products.'),
            );
        }
    }
}
