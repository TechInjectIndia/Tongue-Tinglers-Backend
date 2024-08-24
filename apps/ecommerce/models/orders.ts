import {Op} from "sequelize";
import {
    TOrder,
    TOrderFilters,
    TOrdersList,
    TAddOrder,
} from "../../../types/ecommerce";
import { Order } from "../../../database/schema";

export class OrderModel {
    constructor() { }

    public async getOrderByName(name: string): Promise<TOrder | any> {
        const data = await Order.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async getOrderById(id: number): Promise<TOrder | any> {
        const data = await Order.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TOrderFilters): Promise<TOrdersList | any> {
        const total = await Order.count({
            where: {
                orderId: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Order.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                orderId: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async update(id: number, data: TAddOrder): Promise<TOrder | any> {
        const response = await Order.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TOrder | any> {
        const response = await Order.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
