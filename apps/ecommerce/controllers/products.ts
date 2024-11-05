import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, uploadSingleFileToFirebase } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { ProductRepo } from '../models/products';
import { VendorRepo } from '../../vendor/models/VendorRepo';
import { ProductCategoryRepo } from '../models/category';
import { ProductCategoryMapRepo } from '../models/product-category-map';
import { StockRepo } from '../models/stock';
import slugify from 'slugify';

export default class ProductsController {
    static async uploadImage(req: Request, res: Response, next: NextFunction) {
        try {
            const moduleName = 'product';
            await uploadSingleFileToFirebase(req as any, moduleName as string);
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
            const payload = req.body;
            const productId = req.body.productId;
            const categoryId = req.body.categoryId;

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
            const productId = req.body.productId;
            const categoryId = req.body.categoryId;

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
            const name = get(req.body, "name", "");
            const vendorId = get(req.body, "vendorId", "");
            const createProduct = req.body;

            // Create slug if not provided
            if (createProduct.slug === '') {
                createProduct.slug = slugify(name, { lower: true });
            }

            if (vendorId != null && vendorId != '') {
                const existingVendor = await new VendorRepo().get(vendorId as string);
                if (!existingVendor) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                `Vendor ${ERROR_MESSAGE.NOT_EXISTS}`
                            )
                        );
                }
            }

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

            // Create the product
            const Product = await new ProductRepo().create(createProduct);

            // Create stock for the product
            const stockData = {
                productId: Product.id,
                quantity: createProduct.stock || 0, // Assuming stock quantity is sent in the request
            };
            await new StockRepo().create(stockData);

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
            console.log(err);
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req.query, "size", 10);
            const skip = get(req.query, "skip", 1);
            const search = get(req.query, "search", "");
            const trashOnly = get(req.query, "trashOnly", "");
            let sorting = get(req.query, "sorting", "id DESC");
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
            const id = get(req.params, "id", 0);
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

            const updateProductData = req.body;
            delete updateProductData.id;

            const Product = await new ProductRepo().update(id as number, updateProductData);

            // Update stock if quantity is provided
            if (updateProductData.stock !== undefined) {
                await new StockRepo().update(id as number, updateProductData.stock);
            }

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
            const id = get(req.params, "id", 0);
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

            // Get stock information
            const stock = await new StockRepo().getByProductId(id as number);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        { product: Product, stock }
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
            const ids = get(req.body, "ids", "");
            const Product = await new ProductRepo().delete(ids);

            // Optionally, delete stock related to the product here
            await new StockRepo().deleteByProductIds(ids); // Implement this in StockRepo if needed

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

    static async updateStock(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = get(req.params, "productId", 0);
            const quantity = get(req.body, "quantity", 0);

            const stock = await new StockRepo().getByProductId(productId as number);
            if (!stock) {
                return res
                    .status(404)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, 'Stock not found.'));
            }

            await new StockRepo().update(productId as number, quantity);

            return res
                .status(200)
                .send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPDATED, stock));
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
