import {Op, Transaction} from "sequelize";
import {TListFiltersCampaigns} from "../../../types";

import IBaseRepo from "../controllers/controller/IController";
import {OrganizationModel} from "../../organization/models/OrganizationTable";
import {
    CampaignPayload,
    ICampaign,
    ParsedCampaign,
    TCampaignList
} from "../interface/campaign";
import {CampaignAdModel} from "./CampaignModel";
import {RegionModel} from "apps/region/models/RegionTable";
import {AreaModel} from "apps/area/models/AreaTable";
import {QuestionModel} from "apps/questions/models/QuestionModel";
import {ProposalModel} from "../../proposal_model/models/ProposalModelTable";
import {
    FranchiseLeadModel
} from "../../franchise_model/models/FranchiseModelTable";
import {handleError} from "../../common/utils/HelperMethods";
import { UserModel } from "apps/user/models/UserTable";
import { getUserName } from "apps/common/utils/commonUtils";

export class CampaignAdRepo
    implements IBaseRepo<ParsedCampaign, TListFiltersCampaigns> {
    constructor() {
    }

    public async getCampaignsByFranchiseId(franchiseId: number): Promise<any> {
        let whereOptions: any = {franchiseId: franchiseId};
        return await CampaignAdModel.findAll({
            where: whereOptions,
        });
    }

    public async get(id: any,
        options?: {
            transaction: Transaction
        }): Promise<ParsedCampaign | null> {
        const {transaction} = options || {};
        const campaign = await CampaignAdModel.findOne({
            where: {id},
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
                    include: [
                        {
                            model: FranchiseLeadModel,
                            as: "franchiseModelObj",

                        },
                    ],
                },
                {
                    model: QuestionModel,
                    as: "questions",
                },
            ],
        });

        console.log(campaign?.toJSON());
        return campaign as unknown as ParsedCampaign;
    }

    public async list(filters: TListFiltersCampaigns): Promise<TCampaignList> {
        // Initialize the whereCondition object
        const whereCondition: any = {
            [Op.or]: [
                {name: {[Op.iLike]: `%${filters.search}%`}}, // Assuming `name`
                // is a string
                {description: {[Op.iLike]: `%${filters.search}%`}}, // Assuming
                // `description`
                // is a
                // string
            ],
        };

        if (filters.filters?.regionId) {
            whereCondition.regionId = filters.filters.regionId;
        }

        if(filters.filters?.organizationId){
            whereCondition.organizationId = filters.filters?.organizationId
        }

        if(filters.filters.proposalId){
            whereCondition.proposalIds = {
                [Op.contains]: parseInt(filters.filters.proposalId)
            };
        }

        if(filters.filters.validDate){
            const inputDate = new Date(filters.filters.validDate); // Ensure date is properly formatted
            if (!isNaN(inputDate.getTime())) {
                whereCondition[Op.and] = [
                    { start: { [Op.lte]: inputDate } }, // Start date is less than or equal to inputDate
                    { to: { [Op.gte]: inputDate } },   // End date is greater than or equal to inputDate
                ];
            }
        }

        // Count total campaigns matching the search criteria
        console.log('whereCondition: ', whereCondition);
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
                    include: [
                        {
                            model: FranchiseLeadModel,
                            as: "franchiseModelObj",

                        },
                    ],
                },
                {
                    model: QuestionModel,
                    as: "questions",
                },
            ],
        });

        return {
            total,
            data: data.map(d => d.toJSON()) as unknown as ParsedCampaign[]
        };
    }

    public async create(data: CampaignPayload, createdBy: number): Promise<ParsedCampaign> {

        const transaction: Transaction = await CampaignAdModel.sequelize.transaction();

        try {
            const user = await UserModel.findByPk(createdBy);
            if (!user) {
                throw new Error("User not found");
            }
            const {proposalIds, questionList, ...campaignData} = data;
            // Step 1: Create the campaign within the transaction
            const createdCampaign = await CampaignAdModel.create(
                {createdBy, ...data},
                {
                    userId: createdBy,
                    userName: getUserName(user),
                    transaction
                });


            // Step 2: Associate questions if provided
            if (questionList && questionList.length > 0) {
                await createdCampaign.setQuestions(questionList, {transaction});
            }

            // Step 3: Associate proposals if provided
            if (proposalIds && proposalIds.length > 0) {
                await createdCampaign.setProposals(proposalIds, {transaction});
            }

            // Commit the transaction
            await transaction.commit();

            // Step 4: Fetch the campaign with all required associations
            const fetchedCampaign = await CampaignAdModel.findOne({
                where: {id: createdCampaign.id},
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
                        include: [
                            {
                                model: FranchiseLeadModel,
                                as: "franchiseModelObj",
                            },
                        ],
                    },
                    {
                        model: QuestionModel,
                        as: "questions",

                    },
                ],
            });

            console.log('fetchedCampaign',fetchedCampaign);

            if (!fetchedCampaign) {
                throw new Error(
                    "Failed to fetch the created campaign with associations.");
            }

            return fetchedCampaign.toJSON() as unknown as ParsedCampaign;
        }
        catch (err) {
            handleError(err)
            // Rollback the transaction in case of an error
            if (transaction) {
                await transaction.rollback();
            }
            console.error("Error during campaign creation:", err);
            throw err;
        }
    }


    public async update(id: number,
        data: CampaignPayload, userId: number): Promise<[affectedCount: number]> {
        const transaction: Transaction = await CampaignAdModel.sequelize.transaction();
        const user = await UserModel.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const campaign = await CampaignAdModel.findByPk(id,{transaction});
        await  campaign.removeProposals(campaign.toJSON().proposalIds,{transaction});
        await campaign.removeQuestions(campaign.toJSON().questionList,{transaction});
        await  campaign.setQuestions(data.questionList,{transaction});
        await  campaign.setProposals(data.proposalIds, {transaction})
        await transaction.commit();
        return await CampaignAdModel.update(data, {
            where: {
                id,
            },
            userId: userId,
            userName: getUserName(user)
        });
    }

    public async delete(ids: number[]):
        Promise<number> {
        // Soft delete campaigns by IDs
        const response = await CampaignAdModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async getByName(name: string): Promise<ICampaign | null> {
        const campaign = await CampaignAdModel.findOne({where: {name}});
        return campaign;
    }
}



