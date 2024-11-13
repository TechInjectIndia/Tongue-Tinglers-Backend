const { Op } = require("sequelize");
import {
    TOrder,
    TOrderFilters,
    TOrdersList,
} from "../../../../types/ecommerce";
import { OrdersModel } from "../../../../database/schema";
import IBaseRepo from '../../controllers/controller/franchise/IFranchiseOrderController';
import { ORDER_TYPE } from '../../../../interfaces';

export class FranchiseOrderRepo implements IBaseRepo<TOrder, TOrderFilters> {
    constructor() { }

    public async getOrderStatusById(id: number): Promise<TOrder | null> {
        const data = await OrdersModel.findOne({
            attributes: ['orderStatus'],
            where: {
                id,
                orderType: ORDER_TYPE.FRANCHISE
            },
        });
        return data;
    }
    public async getOrderById(id: number): Promise<TOrder | null> {
        const data = await OrdersModel.findOne({
            where: {
                id,
                orderType: ORDER_TYPE.FRANCHISE
            },
        });
        return data;
    }

    public async list(filters: TOrderFilters & { user_id: string }): Promise<TOrdersList> {
        const total = await OrdersModel.count({
            where: {
                trackingNumber: {
                    [Op.like]: `%${filters.search}%`,
                },
                userId: filters.user_id,
                orderType: ORDER_TYPE.FRANCHISE
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
                userId: filters.user_id,
                orderType: ORDER_TYPE.FRANCHISE
            },
        });
        return { total, data };
    }

}
