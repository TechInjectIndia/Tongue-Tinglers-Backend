import {DataTypes, Model, Optional, Transaction} from "sequelize";

import {QuestionModel} from "apps/questions/models/QuestionModel";
import RepoProvider from "apps/RepoProvider";
import {CampaignQuestionModel} from "./CampaignQuestionModel";
import {CampaignPayload, ICampaign} from "../interface/campaign";
import {sequelize} from "config/database";
import {LeadsModel} from "apps/lead/models/LeadTable";
import {RegionModel} from "apps/region/models/RegionTable";
import {AffiliateModel} from "apps/affiliate/models/affiliateModel";
import {OrganizationModel} from "apps/organization/models/OrganizationTable";
import {ProposalModel} from "../../proposal_model/models/ProposalModelTable";
import {CampaignProposalsModel} from "./CampaignProposalsModel";

const {STRING, INTEGER, DATE, NOW, JSONB} = DataTypes;

interface CampaignCreationAttributes
    extends Optional<ICampaign, "id" | "createdAt" | "updatedAt" | "deletedAt"> {
}

class CampaignAdModel extends Model<ICampaign, CampaignCreationAttributes>
    implements ICampaign {

    public id!: number;
    public name!: string;
    public organizationId!: number;
    public regionId: number;
    public description?: string;
    public questionList!: number[];
    public affiliateId?: number;
    public proposalIds!: number[];
    public start!: Date;
    public to!: Date;

    public createdBy!: number;
    public updatedBy!: number | null;
    public deletedBy!: number | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;

    public setQuestions: (questions: Array<QuestionModel | number>,
        options: { transaction: Transaction }) => Promise<void>;
    public removeQuestions: (questions: Array<QuestionModel | number>,
                             options: { transaction: Transaction }  ) => Promise<void>;
    public setProposals: (proposals: Array<ProposalModel | number>,
        options: { transaction: Transaction }) => Promise<void>;
    public removeProposals: (proposals: Array<ProposalModel | number>,
        options: { transaction: Transaction }) => Promise<void>;


    public static initModel() {
        CampaignAdModel.init(
            {
                id: {
                    type: INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                },
                organizationId: {
                    type: INTEGER,
                    allowNull: true,
                },
                regionId: {
                    type: INTEGER,
                    references: {
                        model: RegionModel,
                        key: "id",
                    },
                    allowNull: true,
                }, // Update region to regionId
                name: {
                    type: STRING,
                    allowNull: false,
                    comment: "Name of the campaign",
                },
                description: {
                    type: STRING,
                    allowNull: true,
                    comment: "Description of the campaign",
                },
                questionList: {
                    type: DataTypes.ARRAY(DataTypes.INTEGER), // Array of// integers
                    allowNull: false,
                    comment: "List of questions associated with the campaign",
                },
                affiliateId: {
                    type: INTEGER,
                    allowNull: true,
                },
                proposalIds: {
                    type: JSONB,
                    allowNull: true,
                    comment:
                        "List of proposal model associated with the campaign",
                }, // New field added
                start: {
                    type: DATE,
                    allowNull: true,
                    comment: "Timestamp when the campaign was start",
                },
                to: {
                    type: DATE,
                    allowNull: true,
                    comment: "Timestamp when the campaign was start",
                },
                createdBy: {
                    type: INTEGER,
                    allowNull: false,
                    comment: "User who created the campaign",
                },
                updatedBy: {
                    type: INTEGER,
                    allowNull: true,
                    comment: "User who last updated the campaign",
                },
                deletedBy: {
                    type: INTEGER,
                    allowNull: true,
                    comment: "User who deleted the campaign (if soft deleted)",
                },
                createdAt: {
                    type: DATE,
                    allowNull: false,
                    defaultValue: NOW,
                    comment: "Timestamp when the campaign was created",
                },
                updatedAt: {
                    type: DATE,
                    allowNull: false,
                    defaultValue: NOW,
                    comment: "Timestamp when the campaign was last updated",
                },
                deletedAt: {
                    type: DATE,
                    allowNull: true,
                    comment:
                        "Timestamp when the campaign was deleted (if soft deleted)",
                },
            },
            {
                sequelize,
                tableName: "campaigns",
                timestamps: true,
                paranoid: true,
                comment: "Table to store campaigns",
            }
        );
        return CampaignAdModel;
    }

    public static associate() {
        CampaignAdModel.hasMany(LeadsModel, {
            foreignKey: "campaignId",
            as: "campaign_ad",
        });

        CampaignAdModel.belongsTo(RegionModel, {
            foreignKey: "regionId",
            as: "region",
        });

        CampaignAdModel.belongsTo(AffiliateModel, {
            foreignKey: "affiliateId",
            as: "affiliate",
        });

        // Many-to-Many association with ProposalModel
        CampaignAdModel.belongsToMany(ProposalModel, {
            through: CampaignProposalsModel, // Junction table
            foreignKey: "campaignId",
            otherKey: "proposalId",
            as: "proposals",
        });

        CampaignAdModel.belongsTo(OrganizationModel, {
            foreignKey: "organizationId",
            as: "organization",
        });

        CampaignAdModel.belongsToMany(QuestionModel, {
            through: CampaignQuestionModel,
            foreignKey: "campaignId",
            otherKey: "questionId",
            as: "questions",
        });
    }

    public static hook() {
        CampaignAdModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Campaign",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the CampaignAdModel
        CampaignAdModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Campaign",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the CampaignAdModel
        CampaignAdModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Campaign",
                instance,
                options
            );
        });
    }

}

export {CampaignAdModel};
