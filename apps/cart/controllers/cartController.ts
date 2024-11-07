import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { CartRepo } from "../models/CartRepo";
import { ProductRepo } from "../../ecommerce/models/products";
import { RetortProductRepo } from "../../retort/models/products";

export default class CartController {
    // Add product to cart
    static async addProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, 'user_id', '2f017e36-391f-4f31-bab3-c75f34aff48b');
            const { product_id, quantity, productType } = req.body;

            if (productType == 'retort') {
                const existingProduct = await new RetortProductRepo().get(product_id as number);
                if (!existingProduct) {
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

            if (productType == 'packaging') {
                const existingProduct = await new ProductRepo().get(product_id as number);
                if (!existingProduct) {
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

            // Add product to the cart
            const cart = await new CartRepo().addProduct(user_id, product_id, quantity, productType);

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.CREATED,
                    cart
                )
            );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Remove a product from the cart
    static async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, 'user_id', '2f017e36-391f-4f31-bab3-c75f34aff48b');
            const { product_id, productType } = req.body;

            if (productType == 'retort') {
                const existingProduct = await new RetortProductRepo().get(product_id as number);
                if (!existingProduct) {
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

            if (productType == 'packaging') {
                const existingProduct = await new ProductRepo().get(product_id as number);
                if (!existingProduct) {
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

            // Remove product from the cart
            const cart = await new CartRepo().removeProduct(user_id, product_id, productType);

            if (!cart) {
                return res.status(404).send({
                    message: `Cart ${ERROR_MESSAGE.NOT_EXISTS}`,
                });
            }

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.UPDATED,
                    cart
                )
            );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Update the quantity or price of a product in the cart
    static async removeProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, 'user_id', '2f017e36-391f-4f31-bab3-c75f34aff48b');
            const { product_id, quantity, productType } = req.body;

            if (productType == 'retort') {
                const existingProduct = await new RetortProductRepo().get(product_id as number);
                if (!existingProduct) {
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

            if (productType == 'packaging') {
                const existingProduct = await new ProductRepo().get(product_id as number);
                if (!existingProduct) {
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

            // Update product details in the cart
            const updatedCart = await new CartRepo().updateProduct(user_id, product_id, quantity, productType);

            if (!updatedCart) {
                return res.status(404).send({
                    message: `Cart ${ERROR_MESSAGE.NOT_EXISTS}`,
                });
            }

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.UPDATED,
                    updatedCart
                )
            );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Empty a cart
    static async empty(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = get(req, 'user_id', '2f017e36-391f-4f31-bab3-c75f34aff48b');
            const cart = await new CartRepo().findById(userId);

            if (!cart) {
                return res.status(404).send({
                    message: ERROR_MESSAGE.CART_EMPTY,
                });
            }

            const cartId = cart.id;
            const cartData = await new CartRepo().empty(cartId);
            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.CLEARED,
                    cartData
                )
            );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Get a cart by ID
    static async getCartById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = get(req, 'user_id', '2f017e36-391f-4f31-bab3-c75f34aff48b');
            const cart = await new CartRepo().findById(userId);

            if (!cart) {
                return res.status(404).send({
                    message: ERROR_MESSAGE.CART_EMPTY,
                });
            }

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.FETCHED,
                    cart
                )
            );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Delete a cart by ID
    static async deleteCart(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = get(req, 'user_id', '2f017e36-391f-4f31-bab3-c75f34aff48b');
            const cart = await new CartRepo().findById(userId);

            if (!cart) {
                return res.status(404).send({
                    message: ERROR_MESSAGE.CART_EMPTY,
                });
            }

            const cartId = cart.id;
            await new CartRepo().delete(cartId);
            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.DELETED
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
