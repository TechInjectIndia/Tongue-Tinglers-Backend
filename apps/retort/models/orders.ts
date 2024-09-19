const { Op } = require("sequelize");
import {
    TOrder,
    TOrderFilters,
    TOrdersList,
    TEditOrder,
    TAddOrder,
} from "../../../types/ecommerce";
import { OrdersModel, OrderItemsModel } from "../../../database/schema";
import { ORDER_TYPE } from '../../../interfaces';
import IBaseRepo from '../controllers/controller/IOrdersController';

export class RetortOrderRepo implements IBaseRepo<TOrder, TOrderFilters> {
    constructor() { }

    public async orderStatus(id: number): Promise<TOrder | null> {
        const data = await OrdersModel.findOne({
            where: {
                id,
                orderType: ORDER_TYPE.RETORT
            },
            attributes: ['orderStatus']
        });
        return data;
    }

    public async create(data: TAddOrder): Promise<TOrder> {
        const response = await OrdersModel.create(data);
        return response;
    }

    public async get(id: number): Promise<TOrder | null> {
        const data = await OrdersModel.findOne({
            where: {
                id,
                orderType: ORDER_TYPE.RETORT
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
                orderType: ORDER_TYPE.RETORT
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
                orderType: ORDER_TYPE.RETORT
            },
        });
        return { total, data };
    }

    public async update(id: number, data: TEditOrder): Promise<[affectedCount: number]> {
        const response = await OrdersModel.update(data, {
            where: {
                id,
                orderType: ORDER_TYPE.RETORT
            },
        });
        return response;
    }
}
