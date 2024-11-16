const { Op } = require("sequelize");
import {
    TAddOrderItem,
    TOrderItem,
    TOrderFilters,
} from "../../../types/ecommerce";
import { OrderItemsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IOrderItemsController';

export class OrderItemRepo implements IBaseRepo<TAddOrderItem, TOrderFilters> {
    constructor() { }

    public async bulkCreate(orderItems: Array<any>) {
        return await OrderItemsModel.bulkCreate(orderItems);
    }

    public async checkRepeatedOrder(userId: string, productId: number): Promise<TOrderItem> {
        const data = await OrderItemsModel.findOne({
            where: {
                userId: userId,
                productId: productId
            },
            attributes: ['id']
        });
        return data;
    }


    public async create(data: TAddOrderItem): Promise<TAddOrderItem> {
        const response = await OrderItemsModel.create(data);
        return response;
    }
}
