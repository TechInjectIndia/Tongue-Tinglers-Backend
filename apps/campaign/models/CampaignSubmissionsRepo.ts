import { Op } from "sequelize";
import {
    TListFilters,
} from "../../../types";
import {
    TCampaignSubmisisonsList,
    TPayloadCampaignSubmisisons,
    ICampaignSubmisisons,
} from "../../../interfaces";
import { CampaignSubmissions } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/ICampaignSubmissionsController';

export class CampaignSubmissionsRepo implements IBaseRepo<ICampaignSubmisisons, TListFilters> {
    constructor() { }

    public async get(id: number): Promise<ICampaignSubmisisons | null> {
        // Retrieve a campaign by its ID
        const campaign = await CampaignSubmissions.findOne({
            where: {
                id,
            },
        });
        return campaign;
    }

    public async list(filters: TListFilters): Promise<TCampaignSubmisisonsList> {
        // Count total campaigns matching the search criteria
        const total = await CampaignSubmissions.count({
            where: {
                response: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });

        // Retrieve the campaigns with pagination and sorting
        const data = await CampaignSubmissions.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                response: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });

        return { total, data };
    }

    public async save(data: TPayloadCampaignSubmisisons): Promise<ICampaignSubmisisons> {
        // Create a new campaign
        const response = await CampaignSubmissions.create(data);
        return response;
    }

    public async update(id: number, data: TPayloadCampaignSubmisisons): Promise<[affectedCount: number]> {
        // Update a campaign by its ID
        const campaignSubmission = await CampaignSubmissions.findByPk(id);
        if (!campaignSubmission) {
            throw new Error("Campaign Submission not found");
        }
        campaignSubmission.set(data);
        await campaignSubmission.save();
        return [1];
    }

    public async delete(ids: number[]): Promise<number> {
        // Soft delete campaigns by IDs
        const response = await CampaignSubmissions.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
