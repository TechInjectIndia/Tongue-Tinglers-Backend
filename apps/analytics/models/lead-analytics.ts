import { Op, Sequelize } from "sequelize";
import { LeadsModel } from "../../../database/schema";
import { CampaignAdRepo } from "../../campaign/models";
import { FranchiseeRepo } from '../../franchisee/models/FranchiseeRepo';
import { FranchiseType } from "../../../interfaces";

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

    public async leadTimelineForMasterFranchisee(startDate: Date, endDate: Date, groupBy: any, franchiseId: string): Promise<any> {
        if (!(startDate instanceof Date) || !(endDate instanceof Date) || startDate > endDate) {
            throw new Error('Invalid date range provided.');
        } const franchiseRepo = new FranchiseeRepo();

        // Use PostgreSQL's date functions to format dates for grouping
        const dateAttribute = groupBy === "day"
            ? Sequelize.fn('DATE', Sequelize.col('created_at'))
            : Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('created_at'));

        const whereOptions: any = {
            createdAt: {
                [Op.between]: [startDate.toISOString(), endDate.toISOString()]
            }
        };

        if (franchiseId) {
            const franchiseRepo = new FranchiseeRepo();
            const franchiseData = await franchiseRepo.getFranchiseeById(franchiseId);

            if (!franchiseData) {
                throw new Error('Franchise data not found.');
            }
            let campaignIds: string[] = [];

            switch (franchiseData.franchiseType) {
                case FranchiseType.SUPER_FRANCHISE:
                    const campaignDataSuper = await new CampaignAdRepo().getCampaignsByFranchiseId(franchiseId, FranchiseType.SUPER_FRANCHISE);
                    campaignIds = campaignDataSuper.map(campaign => campaign.id);
                case FranchiseType.FRANCHISE:
                    const campaignDataFranchise = await new CampaignAdRepo().getCampaignsByFranchiseId(franchiseId, FranchiseType.FRANCHISE);
                    campaignIds = campaignDataFranchise.map(campaign => campaign.id);
                    break;
                default:
                    throw new Error('Invalid franchise type.');
            }

            if (campaignIds.length === 0) {
                throw new Error('No campaigns found for this franchise.');
            }

            // Add campaign ID filtering to where options
            whereOptions.campaignId = { [Op.in]: campaignIds };
        }

        const data = await LeadsModel.findAll({
            attributes: [
                [dateAttribute, 'date'],
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
            ],
            where: whereOptions,
            group: ['date'],
            order: [[dateAttribute, 'ASC']]
        });

        console.log(data);
        return data;
    }

    public async leadTimelineForSuperFranchisee(startDate: Date, endDate: Date, groupBy: any, franchiseData: any, franchiseId: string): Promise<any> {
        if (!(startDate instanceof Date) || !(endDate instanceof Date) || startDate > endDate) {
            throw new Error('Invalid date range provided.');
        }

        // Use PostgreSQL's date functions to format dates for grouping
        const dateAttribute = groupBy === "day"
            ? Sequelize.fn('DATE', Sequelize.col('created_at'))
            : Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('created_at'));


        const whereOptions: any = {
            createdAt: {
                [Op.between]: [startDate.toISOString(), endDate.toISOString()]
            }
        };

        let campaignIds: string[] = [];
        if (franchiseId) {
            const franchiseRepo = new FranchiseeRepo();
            const franchiseData = await franchiseRepo.getFranchiseeById(franchiseId);

            if (!franchiseData) {
                throw new Error('Franchise data not found.');
            }

            switch (franchiseData.franchiseType) {
                case FranchiseType.FRANCHISE:
                    const campaignDataFranchise = await new CampaignAdRepo().getCampaignsByFranchiseId(franchiseId, FranchiseType.FRANCHISE);
                    campaignIds = campaignDataFranchise.map(campaign => campaign.id);
                    break;
                default:
                    throw new Error('Invalid franchise type.');
            }

            if (campaignIds.length === 0) {
                throw new Error('No campaigns found for this franchise.');
            }

            // Add campaign ID filtering to where options
            whereOptions.campaignId = { [Op.in]: campaignIds };
        } else {
            // get all campaigns where franchiseId
            const campaignData = await new CampaignAdRepo().getCampaignsByFranchiseId(franchiseData.id, '');
            campaignIds = campaignData.map(campaign => campaign.id);
        }

        // get all leads where campaign id is 
        const data = await LeadsModel.findAll({
            attributes: [
                [dateAttribute, 'date'],
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
            ],
            where: whereOptions,
            group: ['date'],
            order: [[dateAttribute, 'ASC']]
        });

        console.log(data);
        return data;
    }

    public async leadTimelineForFranchisee(startDate: Date, endDate: Date, groupBy: any, franchiseData: any): Promise<any> {
        if (!(startDate instanceof Date) || !(endDate instanceof Date) || startDate > endDate) {
            throw new Error('Invalid date range provided.');
        }

        // Use PostgreSQL's date functions to format dates for grouping
        const dateAttribute = groupBy === "day"
            ? Sequelize.fn('DATE', Sequelize.col('created_at'))
            : Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('created_at'));

        // get all campaigns where franchiseId
        const campaignData = await new CampaignAdRepo().getCampaignsByFranchiseId(franchiseData.id, '');
        const campaignIds = campaignData.map(campaign => campaign.id);

        const data = await LeadsModel.findAll({
            attributes: [
                [dateAttribute, 'date'],
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate.toISOString(), endDate.toISOString()]
                },
                campaignId: {
                    [Op.in]: campaignIds
                }
            },
            group: ['date'],
            order: [[dateAttribute, 'ASC']]
        });

        console.log(data);
        return data;
    }

    public async leadStatusByTypeForMasterFranchisee(statusType: any, startDate: Date, endDate: Date, franchiseId: string): Promise<any> {
        const whereOptions: any = {
            createdAt: {
                [Op.between]: [startDate, endDate]
            },
            status: statusType
        };

        if (franchiseId) {
            const franchiseRepo = new FranchiseeRepo();
            const franchiseData = await franchiseRepo.getFranchiseeById(franchiseId);

            if (!franchiseData) {
                throw new Error('Franchise data not found.');
            }
            let campaignIds: string[] = [];

            switch (franchiseData.franchiseType) {
                case FranchiseType.SUPER_FRANCHISE:
                    const campaignDataSuper = await new CampaignAdRepo().getCampaignsByFranchiseId(franchiseId, FranchiseType.SUPER_FRANCHISE);
                    campaignIds = campaignDataSuper.map(campaign => campaign.id);
                case FranchiseType.FRANCHISE:
                    const campaignDataFranchise = await new CampaignAdRepo().getCampaignsByFranchiseId(franchiseId, FranchiseType.FRANCHISE);
                    campaignIds = campaignDataFranchise.map(campaign => campaign.id);
                    break;
                default:
                    throw new Error('Invalid franchise type.');
            }

            if (campaignIds.length === 0) {
                throw new Error('No campaigns found for this franchise.');
            }

            // Add campaign ID filtering to where options
            whereOptions.campaignId = { [Op.in]: campaignIds };
        }


        const data = await LeadsModel.count({
            where: whereOptions,
        });
        return data;
    }

    public async leadStatusByTypeForSuperFranchisee(statusType: any, startDate: Date, endDate: Date, franchiseId: string, franchiseData: any): Promise<any> {
        const whereOptions: any = {
            createdAt: {
                [Op.between]: [startDate, endDate]
            },
            status: statusType
        };

        let campaignIds: string[] = [];
        if (franchiseId) {
            const franchiseRepo = new FranchiseeRepo();
            const franchiseData = await franchiseRepo.getFranchiseeById(franchiseId);

            if (!franchiseData) {
                throw new Error('Franchise data not found.');
            }

            switch (franchiseData.franchiseType) {
                case FranchiseType.FRANCHISE:
                    const campaignDataFranchise = await new CampaignAdRepo().getCampaignsByFranchiseId(franchiseData.id, FranchiseType.FRANCHISE);
                    campaignIds = campaignDataFranchise.map(campaign => campaign.id);
                    break;
                default:
                    throw new Error('Invalid franchise type.');
            }

            if (campaignIds.length === 0) {
                throw new Error('No campaigns found for this franchise.');
            }

            // Add campaign ID filtering to where options
            whereOptions.campaignId = { [Op.in]: campaignIds };
        } else {
            // get all campaigns where franchiseId
            const campaignData = await new CampaignAdRepo().getCampaignsByFranchiseId(franchiseData.id, '');
            campaignIds = campaignData.map(campaign => campaign.id);
        }

        const data = await LeadsModel.count({
            where: whereOptions,
        });
        return data;
    }

    public async leadStatusByTypeForFranchisee(statusType, startDate: Date, endDate: Date, franchiseData: any): Promise<any> {
        const campaignData = await new CampaignAdRepo().getCampaignsByFranchiseId(franchiseData.id, '');
        const campaignIds = campaignData.map(campaign => campaign.id);
        const whereOptions: any = {
            createdAt: {
                [Op.between]: [startDate, endDate]
            },
            status: statusType
        };

        whereOptions.campaignId = { [Op.in]: campaignIds };

        const data = await LeadsModel.count({
            where: whereOptions,
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
