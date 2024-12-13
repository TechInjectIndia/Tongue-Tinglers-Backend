const { Op } = require("sequelize");
import {
    TOrder,
    TOrderFilters,
    TOrdersList,
    TOrderPayload,
} from "../../../types/ecommerce";
import { OrdersModel, OrderItemsModel, ShippingHistoryModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IOrdersController';

export class OrderRepo implements IBaseRepo<TOrder, TOrderFilters> {
    constructor() { }

    public async getOrderByPaymentId(
        paymentId: string
    ): Promise<TOrder | null> {
        try {
            const orderDetails = await OrdersModel.findOne({
                where: {
                    paymentId: paymentId
                },
            });

            return orderDetails;
        } catch (error) {
            console.error("Error fetching orderDetails by paymentId:", error);
            throw error;
        }
    }

    public async create(data: TOrderPayload): Promise<TOrder> {
        const response = await OrdersModel.create(data);
        return response;
    }

    public async orderStatus(id: number): Promise<TOrder> {
        const data = await OrdersModel.findOne({
            where: {
                id,
            },
            attributes: ['orderStatus']
        });
        return data;
    }

    public async get(id: number): Promise<TOrder> {
        const data = await OrdersModel.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: OrderItemsModel,
                    as: 'items'
                },
                {
                    model: ShippingHistoryModel,
                },
            ],
        });
        return data;
    }

    public async list(filters: TOrderFilters): Promise<TOrdersList> {
        const total = await OrdersModel.count({
            where: {
                trackingNumber: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        const data = await OrdersModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                trackingNumber: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async update(id: number, data: TOrderPayload): Promise<[affectedCount: number]> {
        const response = await OrdersModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }
}
