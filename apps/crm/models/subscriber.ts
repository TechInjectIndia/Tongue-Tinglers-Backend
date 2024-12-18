const { Op } = require("sequelize");

import { SubscriberModel } from "../../../database/schema";
import { TQueryFilters } from "../../../types";
import { TSubscriber, TSubscribersList, TAddSubscriber, TEditSubscriber } from "../../../types/crm/crm";
import IBaseRepo from '../controllers/controller/ISubscriberController';

export class SubscriberRepo implements IBaseRepo<TSubscriber, TQueryFilters> {
    constructor() { }

    public async get(id: number): Promise<TSubscriber | null> {
        const data = await SubscriberModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TQueryFilters): Promise<TSubscribersList> {
        const total = await SubscriberModel.count({
            where: {
                name: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        const data = await SubscriberModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TAddSubscriber): Promise<TSubscriber> {
        const response = await SubscriberModel.create(data);
        return response;
    }

    public async update(id: number, data: TEditSubscriber): Promise<[affectedCount: number]> {
        const response = await SubscriberModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await SubscriberModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
