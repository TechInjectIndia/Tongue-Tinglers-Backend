import { Op } from "sequelize";
import { sequelize } from "../../../config";
import { TListFiltersCampaigns } from "../../../types";
import {
    TCampaignList,
    TPayloadCampaign,
    ICampaign,
    IQuestion,
} from "../../../interfaces";
import { CampaignAdModel, questionModel } from "../../../database/schema";
import IBaseRepo from "../controllers/controller/IController";

export class CampaignAdRepo
    implements IBaseRepo<ICampaign, TListFiltersCampaigns>
{
    constructor() {}

    public async getCampaignsByFranchiseId(franchiseId: string): Promise<any> {
        let whereOptions: any = { franchiseId: franchiseId };
        return await CampaignAdModel.findAll({
            where: whereOptions,
        });
    }

    public async get(id: any): Promise<ICampaign | null> {
        const campaign = await CampaignAdModel.findOne({ where: { id } });

        const { questionList } = campaign;

        const questions = questionList?.length
            ? await questionModel.findAll({ where: { id: questionList } })
            : [];

        const campaignWithQuestions = {
            ...campaign.toJSON(),
            questions: questions.map((q) => q.toJSON() as IQuestion),
        };

        return campaignWithQuestions;
    }

    public async list(filters: TListFiltersCampaigns): Promise<TCampaignList> {
        // Initialize the whereCondition object
        const whereCondition: any = {
            [Op.or]: [
                { name: { [Op.like]: `%${filters.search}%` } }, // Assuming `name` is a string
                { description: { [Op.like]: `%${filters.search}%` } }, // Assuming `description` is a string
            ],
        };

        // Apply franchiseId and regionId filters only if valid values are provided
        if (filters.filters?.franchiseId) {
            whereCondition.franchiseId = {
                [Op.eq]: filters.filters.franchiseId,
            }; // Assuming franchiseId is a string or UUID
        }
        if (filters.filters?.regionId) {
            whereCondition.regionId = { [Op.eq]: filters.filters.regionId }; // Assuming regionId is an integer
        }

        // Add a specific condition for regionId if it needs to support `search`
        if (filters.search && !isNaN(Number(filters.search))) {
            whereCondition[Op.or].push({
                regionId: { [Op.eq]: Number(filters.search) },
            });
        }

        // Count total campaigns matching the search criteria
        const total = await CampaignAdModel.count({
            where: whereCondition,
        });

        // Retrieve the campaigns with pagination, sorting, and the updated whereCondition
        const data = await CampaignAdModel.findAll({
            order: [filters.sorting], // Ensure sorting is sanitized
            offset: filters.offset,
            limit: filters.limit,
            where: whereCondition,
        });

        return { total, data };
    }

    public async create(data: TPayloadCampaign): Promise<ICampaign> {
        // Create a new campaign
        const response = await CampaignAdModel.create(data);
        return response;
    }

    public async update(
        id: number,
        data: TPayloadCampaign
    ): Promise<[affectedCount: number]> {
        // Update a campaign by its ID
        return await CampaignAdModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async delete(ids: number[]): Promise<number> {
        // Soft delete campaigns by IDs
        const response = await CampaignAdModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async getByName(name: string): Promise<ICampaign | null> {
        const campaign = await CampaignAdModel.findOne({ where: { name } });

        return campaign;
    }
}
