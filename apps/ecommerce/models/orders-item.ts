const { Op } = require("sequelize");
import {
    TAddOrderItem,
    TOrderFilters,
} from "../../../types/ecommerce";
import { OrderItemsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IOrderItemsController';

export class OrderItemRepo implements IBaseRepo<TAddOrderItem, TOrderFilters> {
    constructor() { }

    public async create(data: TAddOrderItem): Promise<TAddOrderItem> {
        const response = await OrderItemsModel.create(data);
        return response;
    }
}
