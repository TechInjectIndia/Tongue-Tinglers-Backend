import { Op, Sequelize } from "sequelize";
import {
    TAnalyticsFilters,
    TAnalyticssList,
} from "../../../types/analytics";
import { LeadsModel } from "../../../database/schema";

export class AnalyticsModel {
    constructor() {}

    // Lead Sources Analytics
    public async leadSources(startDate: Date, endDate: Date): Promise<TAnalyticssList | any> {
        const data = await LeadsModel.findAll({
            attributes: [
                'source',
                [Sequelize.fn('COUNT', Sequelize.col('source')), 'count'] // Correct usage of Sequelize functions
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]  // Use Op.between
                },
            },
            group: 'source'
        });
        return data;
    }

    // Conversion Rate Analytics
    public async conversionRate(startDate: Date, endDate: Date): Promise<TAnalyticssList | any> {
        const data = await LeadsModel.findAll({
            attributes: [
                'status',
                [Sequelize.fn('COUNT', Sequelize.col('status')), 'count'] // Correct usage of Sequelize functions
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                },
            },
            group: 'status'
        });
        return data;
    }

    // Sales Pipeline Analytics (implementation pending)
    public async salesPipeline(filters: TAnalyticsFilters): Promise<TAnalyticssList | any> {
        // You can implement this function based on your business logic for the sales pipeline
    }
}
