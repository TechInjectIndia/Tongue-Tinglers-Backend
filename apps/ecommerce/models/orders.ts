const { Op } = require("sequelize");
import {
    TOrder,
    TOrderFilters,
    TOrdersList,
    TAddOrder,
} from "../../../types/ecommerce";
import { OrdersModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IOrdersController';

export class OrderRepo implements IBaseRepo<TOrder, TOrderFilters> {
    constructor() { }

    public async getOrderById(id: number): Promise<TOrder | any> {
        const data = await OrdersModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TOrderFilters): Promise<TOrdersList | any> {
        const total = await OrdersModel.count({
            where: {
                id: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await OrdersModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                id: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async update(id: number, data: TAddOrder): Promise<TOrder | any> {
        const response = await OrdersModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }
}
