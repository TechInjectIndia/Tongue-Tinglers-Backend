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
