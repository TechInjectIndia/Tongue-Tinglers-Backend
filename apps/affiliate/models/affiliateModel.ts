import { DataTypes, Model, Optional } from "sequelize";
import { UserModel } from "apps/user/models/UserTable";
import { SocialMediaDetailsModel } from "apps/lead/models/smDetailsTable";
import { sequelize } from "config";
import RepoProvider from "apps/RepoProvider";
import { AffiliateTable } from "../interface/Affiliate";
import { OrganizationModel } from "apps/organization/models/OrganizationTable";

const { UUID, STRING, JSONB, UUIDV4, INTEGER,DATE } = DataTypes;

// Define the attributes for lead creation
interface AffiliateCreationAttributes extends Optional<AffiliateTable, "id"> { }

// Define the model class for AffiliateModel
class AffiliateModel
    extends Model<AffiliateTable, AffiliateCreationAttributes>
    implements AffiliateTable {
    organizationId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
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

        AffiliateModel.hasOne(OrganizationModel, {
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
                organizationId: {
                    type: INTEGER,
                    allowNull: false,
                },
                createdAt: {
                    type: DATE,
                    allowNull: false,
                },
                updatedAt: {
                    type: DATE,
                    allowNull: false,
                },
                deletedAt: {
                    type: DATE,
                    allowNull: false,
                },
                createdBy: {
                    type: INTEGER,
                    allowNull: false,
                },
                updatedBy: {
                    type: INTEGER,
                },
                deletedBy: {
                    type: INTEGER,
                    allowNull: false,
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
