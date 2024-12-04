import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { OrderRepo } from '../models/orders';
// import { ProductRepo } from '../models/products';
import { OrderItemRepo } from '../models/orders-item';
import { OrderStatus } from '../../../types';

export default class OrderController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, 'user_id', '');
            const payload = { ...req?.body, userId: user_id, paymentMethod: 'razorpay', orderStatus: OrderStatus.PROCESSED };
            const cartItems = req.body.cart_items;

            const createOrder = await new OrderRepo().create(payload);
            if (createOrder) {
                if (cartItems.length) {
                    cartItems.map(async (product: any, index: number) => {
                        let isRepeated = 0;
                        // const getProduct = await new ProductRepo().get(product.id as number);
                        const checkRepeatedOrder = await new OrderItemRepo().checkRepeatedOrder(user_id as number, product.id as number);
                        if (checkRepeatedOrder) {
                            isRepeated = 1;
                        }
                        const orderItemPayload = {
                            orderId: createOrder.id as number,
                            userId: user_id as number,
                            productId: product.id as number,
                            productType: product.productType,
                            quantity: product.quantity,
                            price: product.price,
                            subtotal: product.subtotal,
                            isRepeated: isRepeated
                        };
                        await new OrderItemRepo().create(orderItemPayload);
                    });
                }
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
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
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            const Orders = await new OrderRepo().list({
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
                        Orders
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = get(req?.params, "id", 0);
            let orderStatusComing = get(req?.body, "orderStatus", 0);
            let orderStatus = OrderStatus.PROCESSED;
            if (orderStatusComing === 'Pending') {
                orderStatus = OrderStatus.PENDING;
            }
            if (orderStatusComing === 'Canceled') {
                orderStatus = OrderStatus.CANCELED;
            }

            const existingOrder = await new OrderRepo().get(orderId as number);
            if (isEmpty(existingOrder)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            const Order = await new OrderRepo().update(orderId as number, { orderStatus });
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        Order
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async orderStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);
            const Order = await new OrderRepo().orderStatus(id as number);

            if (isEmpty(Order)) {
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
                        Order
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
            const Order = await new OrderRepo().get(id as number);

            if (isEmpty(Order)) {
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
                        Order
                    )
                );
        } catch (err) {
            console.log('error', err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}