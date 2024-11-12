const { Op } = require("sequelize");
import {
    TOrder,
    TOrderFilters,
    TOrdersList,
    OrderStatus
} from "../../../../types/ecommerce";
import { OrdersModel } from "../../../../database/schema";

export class OrderModel {
    constructor() { }

    public async getOrderByAttr(whereName: any, whereVal: any, getAttributes: any = '*'): Promise<OrderStatus | any> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await OrdersModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

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

}
