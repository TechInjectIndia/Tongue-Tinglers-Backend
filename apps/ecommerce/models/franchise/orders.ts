const { Op } = require("sequelize");
import {
    TOrder,
    TOrderFilters,
    TOrdersList,
    TOrderStatus
} from "../../../../types/ecommerce";
import { Order } from "../../../../database/schema";

export class OrderModel {
    constructor() { }

    public async getOrderByAttr(whereName: any, whereVal: any, getAttributes: any = '*'): Promise<TOrderStatus | any> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await Order.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
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
                order_id: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Order.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                order_id: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

}
