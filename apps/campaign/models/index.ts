import { Op } from "sequelize";
import { TListFiltersCampaigns } from "../../../types";

import IBaseRepo from "../controllers/controller/IController";
import {
    OrganizationModel
} from "../../organization/models/OrganizationTable";
import { ICampaign, TCampaignList, TPayloadCampaign } from "../interface/campaign";
import { CampaignAdModel } from "./CampaignModel";
import { RegionModel } from "apps/region/models/RegionTable";
import { AreaModel } from "apps/area/models/AreaTable";
import { QuestionModel } from "apps/questions/models/QuestionModel";
import { IQuestion } from "apps/questions/interface/Question";
import {ProposalModel} from "../../proposal_model/models/ProposalModelTable";

export class CampaignAdRepo
    implements IBaseRepo<ICampaign, TListFiltersCampaigns> {
    constructor() {
    }

    public async getCampaignsByFranchiseId(franchiseId: number): Promise<any> {
        let whereOptions: any = { franchiseId: franchiseId };
        return await CampaignAdModel.findAll({
            where: whereOptions,
        });
    }

    public async get(id: any,
        options?: { transaction?: any }): Promise<ICampaign | null> {
        const { transaction } = options || {};
        const campaign = await CampaignAdModel.findOne({
            where: { id },
            include: [
                {
                    model: OrganizationModel,
                    as: "organization",
                },
                {
                    model: RegionModel,
                    as: "region",
                    include: [
                        {
                            model: AreaModel,
                            as: "areas",
                        },
                    ],
                },

            ]
        });

        const { questionList } = campaign;

        const questions = questionList?.length
            ? await QuestionModel.findAll(
                { where: { id: questionList }, transaction })
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
                { name: { [Op.iLike]: `%${filters.search}%` } }, // Assuming `name`
                // is a string
                { description: { [Op.iLike]: `%${filters.search}%` } }, // Assuming
                // `description`
                // is a
                // string
            ],
        };

        // Apply franchiseId and regionId filters only if valid values are
        // provided
        if (filters.filters?.franchiseId) {
            whereCondition.franchiseId = {
                [Op.eq]: filters.filters.franchiseId,
            }; // Assuming franchiseId is a string or UUID
        }
        if (filters.filters?.regionId) {
            whereCondition.regionId = { [Op.eq]: filters.filters.regionId };
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

        // Retrieve the campaigns with pagination, sorting, and the updated
        // whereCondition
        const data = await CampaignAdModel.findAll({
            order: [filters.sorting], // Ensure sorting is sanitized
            offset: filters.offset,
            limit: filters.limit,
            where: whereCondition,
            include: [
                {
                    model: RegionModel,
                    as: "region",
                    include: [
                        {
                            model: AreaModel,
                            as: "areas",
                        },
                    ],
                },
                {
                    model: OrganizationModel,
                    as: "organization",
                },
                {
                    model: ProposalModel,
                    as: "proposals",
                },
                {
                    model: QuestionModel,
                    as: "questions",
                    attributes: ["id", "question", "type"],
                },
            ],
        });

        return { total, data };
    }

    public async create(data: TPayloadCampaign): Promise<ICampaign> {

        const { proposalIds, questionList, ...campaignData } = data;

        // Create the campaign

        const response = await CampaignAdModel.create(data);

        // Associate questions if question IDs are provided
        if (questionList && questionList.length > 0) {
            await response.setQuestions(questionList);
        }

        if (proposalIds && proposalIds.length > 0) {
            await response.setProposals(proposalIds); // Associate proposals with the campaign
        }
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



