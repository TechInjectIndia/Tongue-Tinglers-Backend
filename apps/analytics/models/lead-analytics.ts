const { Sequelize } = require('sequelize');

import {
    TAnalyticsFilters,
    TAnalyticssList,
} from "../../../types/analytics";
import { Lead } from "../../../database/schema";

export class AnalyticsModel {
    constructor() { }

    public async leadSources(startDate: Date, endDate: Date): Promise<TAnalyticssList | any> {
        const data = await Lead.findAll({
            attributes: [
                'source',
                [Sequelize.fn('COUNT', Sequelize.col('source')), 'count']
            ],
            where: {
                createdAt: {
                    [Sequelize.between]: [startDate, endDate]
                },
            },
            group: 'source'
        });
        return data;
    }

    public async conversionRate(startDate: Date, endDate: Date): Promise<TAnalyticssList | any> {
        const data = await Lead.findAll({
            attributes: [
                'status',
                [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
            ],
            where: {
                createdAt: {
                    [Sequelize.between]: [startDate, endDate]
                },
            },
            group: 'status'
        });
        return data;
    }

    public async salesPipeline(filters: TAnalyticsFilters): Promise<TAnalyticssList | any> {

    }
}
