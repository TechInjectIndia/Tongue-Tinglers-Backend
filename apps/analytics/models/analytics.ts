const { Op } = require("sequelize");
import {
    TAnalytics,
    TAnalyticsFilters,
    TAnalyticssList,
    TAddAnalytics,
} from "../../../types/analytics";
import { Payments } from "../../../database/schema";

export class AnalyticsModel {
    constructor() { }

    public async getAnalyticsByAttr(whereName: any, whereVal: any, getAttributes: any = '*'): Promise<TAnalytics | any> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await Payments.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async list(filters: TAnalyticsFilters): Promise<TAnalyticssList | any> {
        const total = await Payments.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Payments.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async add(data: TAddAnalytics): Promise<TAnalytics | any> {
        const response = await Payments.create(data);
        return response;
    }

    public async update(id: number, data: TAddAnalytics): Promise<TAnalytics | any> {
        const response = await Payments.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TAnalytics | any> {
        const response = await Payments.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
