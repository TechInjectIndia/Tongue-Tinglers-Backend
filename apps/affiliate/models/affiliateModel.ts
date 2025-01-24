import { DataTypes, DATE, Model, NOW, Optional } from "sequelize";
import { Affiliate } from "../interface/affiliate";
import { UserModel } from "apps/user/models/UserTable";
import { SocialMediaDetailsModel } from "apps/lead/models/smDetailsTable";
import {CampaignAdModel} from "apps/campaign/models/CampaignModel"
import { sequelize } from "config";
import RepoProvider from "apps/RepoProvider";

const { UUID, STRING, JSONB, UUIDV4, INTEGER } = DataTypes;

// Define the attributes for lead creation
interface AffiliateCreationAttributes extends Optional<Affiliate, "id"> {}

// Define the model class for AffiliateModel
class AffiliateModel
    extends Model<Affiliate, AffiliateCreationAttributes>
    implements Affiliate {
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    createdBy: number;
    updatedBy: number | null;
    deletedBy: number | null;

    public id!: number;
    public type!: string;
    public codes!: Record<string, string>;
    public userId: number;

    public static associate() {
        AffiliateModel.belongsTo(UserModel, {
            foreignKey: "userId",
            as: "user",
        });
        AffiliateModel.hasMany(SocialMediaDetailsModel, {
            as: "sm",
            foreignKey: "affiliateId",
        });

        AffiliateModel.hasMany(CampaignAdModel, {
            as: "cm",
            foreignKey: "affiliateId",
        });
    }

    public static initModel() {
        // Initialize the AffiliateModel
        AffiliateModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                type: {
                    type: STRING,
                    allowNull: false,
                },
                codes: {
                    type: JSONB,
                    allowNull: false,
                },
                userId: {
                    type: INTEGER,
                    allowNull: false,
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
                }
            },
            {
                sequelize,
                tableName: "affiliate_models",
                timestamps: true,
            }
        );
        return AffiliateModel;
    }

    public static hook() {
        AffiliateModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Affiliate",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the Affiliate
        AffiliateModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Affiliate",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the Affiliate
        AffiliateModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Affiliate",
                instance,
                options
            );
        });
    }
}

// Export the model
export { AffiliateModel };
