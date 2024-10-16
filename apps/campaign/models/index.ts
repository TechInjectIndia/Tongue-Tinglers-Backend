import { Op } from "sequelize";
import {
    TListFilters,
} from "../../../types";
import {
    TCampaignList,
    TPayloadCampaign,
    ICampaign,
} from "../../../interfaces";
import { CampaignAdModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IController';

export class CampaignAdRepo implements IBaseRepo<ICampaign, TListFilters> {
    constructor() { }

    public async get(id: string): Promise<ICampaign | null> {
        // Retrieve a campaign by its ID
        const data = await CampaignAdModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TListFilters): Promise<TCampaignList> {
        // Count total campaigns matching the search criteria
        const total = await CampaignAdModel.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`, // Assuming you search by campaign name
                },
            },
        });

        // Retrieve the campaigns with pagination and sorting
        const data = await CampaignAdModel.findAll({
            order: [filters?.sorting], // Sorting should be validated before usage
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`, // Assuming you search by campaign name
                },
            },
        });
        
        return { total, data };
    }

    public async create(data: TPayloadCampaign): Promise<ICampaign> {
        // Create a new campaign
        const response = await CampaignAdModel.create(data);
        return response;
    }

    public async update(id: string, data: TPayloadCampaign): Promise<[affectedCount: number]> {
        // Update a campaign by its ID
        return await CampaignAdModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async delete(ids: string[]): Promise<number> {
        // Soft delete campaigns by IDs
        const response = await CampaignAdModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
