import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";

import { ICampaign } from "../../../interfaces";
import RepoProvider from "../../../apps/RepoProvider";
import {RegionModel} from "../franchise/RegionsModel";
import {LeadsModel} from "../lead/lead.model";
import {AffiliateModel} from "../lead/affiliateModels";
import {ProposalLeadModels} from "../lead/proposalModels";
import {
    OrganizationModel
} from "../../../apps/organization/database/organization_schema";
import {CampaignQuestionModel} from "./CampaignQuestionModel";
import {QuestionModel} from "./QuestionModel";
import {AreaModel} from "../franchise/AreaModel";


const { STRING, INTEGER, DATE, NOW, JSONB } = DataTypes;

interface CampaignCreationAttributes
    extends Optional<ICampaign, "id" | "createdAt" | "updatedAt" | "deletedAt"> {}

class CampaignAdModel extends Model<ICampaign, CampaignCreationAttributes>
    implements ICampaign
{
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

    public setQuestions:(questions: Array<QuestionModel|number>) => Promise<void>;

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
                    type: INTEGER,
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
        CampaignAdModel.hasOne(RegionModel, {
            foreignKey: "regionId",
            as: "region",
        });

        CampaignAdModel.hasOne(AffiliateModel, {
            foreignKey: "affiliateId",
            as: "affiliate",
        });

        CampaignAdModel.hasMany(ProposalLeadModels, {
            foreignKey: "proposalIds",
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

export { CampaignAdModel };
