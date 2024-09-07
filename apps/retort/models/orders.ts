const { Op } = require("sequelize");
import {
    TOrder,
    TOrderFilters,
    TOrdersList,
    TEditOrder,
    TAddOrder,
} from "../../../types/ecommerce";
import { RetortOrdersModel, RetortOrderItemsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IOrdersController';

export class RetortOrderRepo implements IBaseRepo<TOrder, TOrderFilters> {
    constructor() { }

    public async orderStatus(id: number): Promise<TOrder> {
        const data = await RetortOrdersModel.findOne({
            where: {
                id,
            },
            attributes: ['orderStatus']
        });
        return data;
    }

    public async create(data: TAddOrder): Promise<TOrder> {
        const response = await RetortOrdersModel.create(data);
        return response;
    }

    public async get(id: number): Promise<TOrder> {
        const data = await RetortOrdersModel.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: RetortOrderItemsModel,
                    as: 'order_items'
                },
            ],
        });
        return data;
    }

    public async list(filters: TOrderFilters): Promise<TOrdersList> {
        const total = await RetortOrdersModel.count({
            where: {
                trackingNumber: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await RetortOrdersModel.findAll({
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
        const response = await RetortOrdersModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }
}
