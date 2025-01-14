import { BaseOrderItem, OrderItem} from '../../order-items/interface/orderItem'
import RepoProvider from "../../RepoProvider";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE } from "../../../constants";
import { Request, Response } from "express";

export default class OrderItemController {
    
    static async createOrderItem(req: any, res: any) {
        try {
            const payload: BaseOrderItem  = req.body;
            const orderItem = await RepoProvider.orderItemRepo.createOrderItem(payload);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        orderItem,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while creating order items.'),
            );
        }
    }

    static async createBulkOrderItem(req: any, res: any) {
        try {
            const payload: BaseOrderItem[]  = req.body;
            const orderItem = await RepoProvider.orderItemRepo.createBulkOrderItem(payload);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        orderItem,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while creating order items.'),
            );
        }
    }

    static async getOrderItemsById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const orderItems: OrderItem = await RepoProvider.orderItemRepo.getOrderItemsById(id);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        orderItems,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while fetching order items.'),
            );
        }
    }

    static async updateOrderItem(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const payload: OrderItem = req.body;
            payload.id = id;
            const orderItem: OrderItem = await RepoProvider.orderItemRepo.updateOrderItem(payload);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        orderItem,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while updating order items.'),
            );
        }
    }

    static async deleteOrderItem(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const orderItem: OrderItem | null = await RepoProvider.orderItemRepo.deleteOrderItem(id);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        orderItem,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while deleting order items.'),
            );
        }
    }

    static async updateQuantity(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const payload = req.body;
            payload.id = id;
            const orderItem: OrderItem = await RepoProvider.orderItemRepo.updateQuantity(payload);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        orderItem,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while updating order items.'),
            );
        }
    }

    static async updateCouponDiscount(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const payload = req.body;
            payload.id = id;
            const orderItem: OrderItem = await RepoProvider.orderItemRepo.updateCouponDiscount(payload);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        orderItem,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while updating order items.'),
            );
        }
    }

    static async updateStudentDiscount(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const payload = req.body;
            payload.id = id;
            const orderItem: OrderItem = await RepoProvider.orderItemRepo.updateStudentDiscount(payload);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        orderItem,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while updating order items.'),
            );
        }
    }

    static async updatePointsDiscount(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const payload = req.body;
            payload.id = id;
            const orderItem: OrderItem = await RepoProvider.orderItemRepo.updatePointsDiscount(payload);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        orderItem,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while updating order items.'),
            );
        }
    }

}