import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { CampaignAdModel } from "./campaignAdModel";
import { ICampaignSubmisisons } from "../../../interfaces";
import RepoProvider from "../../../apps/RepoProvider";

const { TEXT, DATE, INTEGER, NOW } = DataTypes;

interface AnswerCreationAttributes
    extends Optional<ICampaignSubmisisons, "id" | "createdAt" | "updatedAt"> {}

class CampaignSubmissions
    extends Model<ICampaignSubmisisons, AnswerCreationAttributes>
    implements ICampaignSubmisisons
{
    public id!: number;
    public campaignId!: number;
    public response!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
        CampaignSubmissions.belongsTo(CampaignAdModel, {
            foreignKey: "campaignId",
            as: "campaigns",
        });
    }

    public static initModel() {
        CampaignSubmissions.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                campaignId: {
                    type: INTEGER,
                    allowNull: false,
                },
                response: {
                    type: TEXT,
                    allowNull: false,
                    comment: "The actual answer provided by the user",
                },
                createdAt: {
                    type: DATE,
                    allowNull: false,
                    defaultValue: NOW,
                    comment: "Timestamp when the answer was created",
                },
                updatedAt: {
                    type: DATE,
                    allowNull: false,
                    defaultValue: NOW,
                    comment: "Timestamp when the answer was last updated",
                },
            },
            {
                sequelize,
                tableName: "campaign_submissions",
                timestamps: true,
                comment: "Table to store answers for campaigns",
            }
        );

        return CampaignSubmissions;
    }

    public static hook() {
        CampaignSubmissions.addHook(
            "afterCreate",
            async (instance, options) => {
                await RepoProvider.LogRepo.logModelAction(
                    "create",
                    "CampaignSubmissions",
                    instance,
                    options
                );
            }
        );

        // After Update Hook - Log the updated fields of the FranchiseLead
        CampaignSubmissions.addHook(
            "afterUpdate",
            async (instance, options) => {
                // Now call logModelAction as before
                await RepoProvider.LogRepo.logModelAction(
                    "update",
                    "CampaignSubmissions",
                    instance,
                    options
                );
            }
        );

        // After Destroy Hook - Log the deletion of the FranchiseLead
        CampaignSubmissions.addHook(
            "afterDestroy",
            async (instance, options) => {
                await RepoProvider.LogRepo.logModelAction(
                    "delete",
                    "CampaignSubmissions",
                    instance,
                    options
                );
            }
        );
    }
}

export { CampaignSubmissions };
