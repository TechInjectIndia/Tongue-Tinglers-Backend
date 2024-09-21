import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, uploadSingleFileToFirebase } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { ProductRepo } from '../models/products';
import { ProductCategoryRepo } from '../models/category';
import { ProductCategoryMapRepo } from '../models/product-category-map';
import slugify from 'slugify';

export default class ProductsController {
    static async uploadImage(req: Request, res: Response, next: NextFunction) {
        try {
            const moduleName = 'product'
            await uploadSingleFileToFirebase(req as any, moduleName as string)
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPLOADED,
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async assignCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req?.body;
            const productId = req?.body.productId;
            const categoryId = req?.body.categoryId;

            const existingProduct = await new ProductRepo().get(productId as number);
            const existingCategory = await new ProductCategoryRepo().get(categoryId as number);
            if (existingProduct && existingCategory) {
                const checkIfAlreadyLinked = await new ProductCategoryMapRepo().get(productId as number, categoryId as number);
                if (!checkIfAlreadyLinked) {
                    const createLink = await new ProductCategoryMapRepo().assign(payload);
                    return res
                        .status(200)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.SUCCESS,
                                SUCCESS_MESSAGE.ASSIGNED,
                                createLink
                            )
                        );
                }

            }
            return res
                .status(400)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        'Product or Category is missing!'
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async unAssignCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req?.body.productId;
            const categoryId = req?.body.categoryId;

            const checkIfAlreadyLinked = await new ProductCategoryMapRepo().unassign(productId as number, categoryId as number);
            if (checkIfAlreadyLinked) {
                return res
                    .status(200)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.SUCCESS,
                            SUCCESS_MESSAGE.UNASSIGNED,
                            checkIfAlreadyLinked
                        )
                    );
            }
            return res
                .status(400)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        'Something Went Wrong!'
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const name = get(req?.body, "name", "");
            const createProduct = req?.body;
            createProduct.slug = slugify(name, { lower: true });
            const existingProduct = await new ProductRepo().getProductByName(name);
            if (existingProduct) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.EXISTS
                        )
                    );
            }
            // check if Name exist
            // check if Slug exist
            const Product = await new ProductRepo().create(createProduct);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        Product
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

            const Products = await new ProductRepo().list({
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
                        Products
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
            const existingProduct = await new ProductRepo().get(id as number);
            if (isEmpty(existingProduct)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            const createProduct = req?.body;
            delete createProduct.id

            const Product = await new ProductRepo().update(id as number, createProduct);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        Product
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
            const Product = await new ProductRepo().get(id as number);

            if (isEmpty(Product)) {
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
                        Product
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
            const Product = await new ProductRepo().delete(ids);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        Product
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