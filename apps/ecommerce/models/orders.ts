const { Op } = require("sequelize");
import {
    TOrder,
    TOrderFilters,
    TOrdersList,
    TEditOrder,
    TAddOrder,
} from "../../../types/ecommerce";
import { OrdersModel, OrderItemsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IOrdersController';

export class OrderRepo implements IBaseRepo<TOrder, TOrderFilters> {
    constructor() { }

    public async create(data: TAddOrder): Promise<TOrder> {
        const response = await OrdersModel.create(data);
        return response;
    }

    public async get(id: number): Promise<TOrder> {
        const data = await OrdersModel.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: OrderItemsModel,
                    as: 'order_items'
                },
            ],
        });
        return data;
    }

    public async list(filters: TOrderFilters): Promise<TOrdersList> {
        const total = await OrdersModel.count({
            where: {
                trackingNumber: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await OrdersModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                trackingNumber: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async update(id: number, data: TEditOrder): Promise<[affectedCount: number]> {
        const response = await OrdersModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }
}
