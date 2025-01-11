import { get, isEmpty } from "lodash";
import RepoProvider from "../../RepoProvider";
import { sendResponse } from "../../../libraries";
import {
    ERROR_MESSAGE,
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
} from "../../../constants";
import { Request, Response } from "express";
import { Pagination } from "../../common/models/common";
import { IProductTable, ParsedProduct } from "../interface/Product";
// import { ProductModel } from "../../../database/schema/product/productModel";
export default class ProductController {
    static async createProduct(req: Request, res: Response) {
        const payload: any = req?.body;

        const user_id = get(req, "user_id", null);

        const productDetails = await RepoProvider.ProductRepo.create(
            payload,
            user_id,
        );
        return res
            .status(200)
            .send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.CREATED,
                    productDetails,
                ),
            );
    }

    static async getAllProducts(req: Request, res: Response) {
        try {
            let page = parseInt(<string>get(req.query, "page", "1"));
            if (isNaN(page)) page = 1;
            let limit = parseInt(<string>get(req.query, "limit", "10"));
            if (isNaN(limit)) limit = 10;
            const search = <string>get(req.query, "search", "");
            const filters = <string>get(req.query, "filters", "");

            // Parse filters into an object
            let filterObj = {};
            if (filters) {
                try {
                    filterObj = JSON.parse(filters);
                } catch (error) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                "Invalid filter format. It should be a valid JSON string.",
                            ),
                        );
                }
            }
            const products: Pagination<ParsedProduct> =
                await RepoProvider.ProductRepo.getAll(
                    page,
                    limit,
                    search,
                    filterObj,
                );
            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, {
                    ...products,
                    currentPage: page,
                }),
            );
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        "An error occurred while fetching products.",
                    ),
                );
        }
    }

    static async getProductById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const product: ParsedProduct =
                await RepoProvider.ProductRepo.getById(id);
            if (isEmpty(product)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS,
                        ),
                    );
            }
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        product,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        "An error occurred while fetching products.",
                    ),
                );
        }
    }

    static async updateProduct(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (!id || isNaN(id)) throw Error("Missing id or isNaN");

            const payload: IProductTable = req.body;
            payload.id = id;

            const user_id = get(req, "user_id");
            if (!user_id || isNaN(user_id))
                throw Error("Missing user_id or isNaN");

            payload.updatedBy = user_id;
            const product: IProductTable =
                await RepoProvider.ProductRepo.update(payload);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        product,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        "An error occurred while fetching products.",
                    ),
                );
        }
    }

    static async deleteProduct(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);

            const product: IProductTable | null =
                await RepoProvider.ProductRepo.delete(id);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        product,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        "An error occurred while fetching products.",
                    ),
                );
        }
    }

    static async updateStatus(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const payload = req.body;
            payload.id = id;
            const product: IProductTable =
                await RepoProvider.ProductRepo.changeStatus(payload);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        product,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        "An error occurred while fetching products.",
                    ),
                );
        }
    }

    static async getAllProductBySampleKit(req: Request, res: Response) {
        try {
            let page = parseInt(<string>get(req.query, "page", "1"));
            if (isNaN(page)) page = 1;
            let limit = parseInt(<string>get(req.query, "limit", "10"));
            if (isNaN(limit)) limit = 10;
            const products: Pagination<ParsedProduct> =
                await RepoProvider.ProductRepo.getAllProductBySamplekit(
                    page,
                    limit,
                );
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        { ...products, currentPage: page },
                    ),
                );
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        "An error occurred while fetching products.",
                    ),
                );
        }
    }
}
