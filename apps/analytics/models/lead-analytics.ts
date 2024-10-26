import { Op, Sequelize } from "sequelize";
import {
    TAnalyticsFilters,
    TAnalyticssList,
} from "../../../types/analytics";
import { LeadsModel } from "../../../database/schema";

export class AnalyticsModel {
    constructor() { }

    // Lead Sources Analytics
    public async leadSources(startDate: Date, endDate: Date): Promise<any> {
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
    public async conversionRate(startDate: Date, endDate: Date): Promise<any> {
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

    public async salesPipeline(startDate: Date, endDate: Date): Promise<any> {

        const data = await LeadsModel.findAll({
            attributes: [
                'status',
                [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            group: 'status',
            order: Sequelize.literal('count DESC') // Order by count in descending order
        });

        return data;
    }
}
