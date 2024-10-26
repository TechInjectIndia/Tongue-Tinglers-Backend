import { Op, Sequelize } from "sequelize";
import {
    TAnalyticsFilters,
    TAnalyticssList,
} from "../../../types/analytics";
import { LeadsModel } from "../../../database/schema";

export class AnalyticsModel {
    constructor() { }

    public async getLeadStatusByCampaignIdsAndDateRange(campaignIds: string[], startDate: Date, endDate: Date): Promise<any> {
        return await LeadsModel.findAll({
            attributes: [
                'status',
                [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
            ],
            where: {
                campaignId: {
                    [Op.in]: campaignIds
                },
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            group: 'status'
        });
    }

    // Lead Sources Analytics
    public async leadSources(startDate: Date, endDate: Date): Promise<any> {
        const data = await LeadsModel.findAll({
            attributes: [
                'source',
                [Sequelize.fn('COUNT', Sequelize.col('source')), 'count']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                },
            },
            group: 'source'
        });
        return data;
    }

    public async leadStatus(startDate: Date, endDate: Date): Promise<any> {
        const data = await LeadsModel.findAll({
            attributes: [
                'status',
                [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
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

    public async leadTimeline(startDate: Date, endDate: Date, groupBy: any): Promise<any> {
        if (!(startDate instanceof Date) || !(endDate instanceof Date) || startDate > endDate) {
            throw new Error('Invalid date range provided.');
        }

        // Use PostgreSQL's date functions to format dates for grouping
        const dateAttribute = groupBy === "day"
            ? Sequelize.fn('DATE', Sequelize.col('created_at'))  // For grouping by day
            : Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('created_at'));  // For grouping by month

        const data = await LeadsModel.findAll({
            attributes: [
                [dateAttribute, 'date'],  // Alias for clarity
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
            ],
            where: {
                createdAt: {  // Use the correct column name
                    [Op.between]: [startDate.toISOString(), endDate.toISOString()]
                }
            },
            group: ['date'],  // Group by the date alias
            order: [[dateAttribute, 'ASC']]
        });

        console.log(data); // Log the fetched data for debugging
        return data;
    }

    public async leadStatusByType(statusType, startDate: Date, endDate: Date): Promise<any> {
        const data = await LeadsModel.count({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                },
                status: statusType
            },
        });
        return data;
    }

    // Conversion Rate Analytics
    public async conversionRate(startDate: Date, endDate: Date): Promise<any> {
        const data = await LeadsModel.findAll({
            attributes: [
                'status',
                [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
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
            order: Sequelize.literal('count DESC')
        });

        return data;
    }
}
