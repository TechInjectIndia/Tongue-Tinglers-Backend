import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { FranchiseModels } from "../../../interfaces";
import { SeoImageModel } from "./SeoImageModel";
import { ExtraFieldsModel } from "./extraFieldsModel";
import { IChecklistModel } from "../franchise/iChecklist";
import RepoProvider from "../../../apps/RepoProvider";

const { STRING, TEXT, JSONB } = DataTypes;

// Define the attributes for lead creation
interface LeadCreationAttributes extends Optional<FranchiseModels, "id"> { }

// Define the model class for FranchiseModels
class FranchiseLeadModel
    extends Model<FranchiseModels, LeadCreationAttributes>
    implements FranchiseModels {
    public id!: number;
    public description!: string;
    public title!: string;
    public reqArea!: number;
    public images!: string[] | null;
    public investment!: number;
    public runningCost!: number;
    public bestFor!: string[];
    public inclusions!: string[];
    public others!: string[] | null;

    public static associate() {
        // Define the associations
        FranchiseLeadModel.hasMany(ExtraFieldsModel, {
            foreignKey: "franchiseModelId",
            as: "others",
        });

        FranchiseLeadModel.hasMany(SeoImageModel, {
            foreignKey: "franchiseModelId",
            as: "images",
        });

        ExtraFieldsModel.belongsTo(FranchiseLeadModel, {
            foreignKey: "franchiseModelId",
            as: "franchiseModel",
        });

        SeoImageModel.belongsTo(FranchiseLeadModel, {
            foreignKey: "franchiseModelId",
            as: "franchiseModel",
        });

        FranchiseLeadModel.hasMany(IChecklistModel, {
            foreignKey: "franchiseModelId",
        });
        IChecklistModel.belongsTo(FranchiseLeadModel, {
            foreignKey: "franchiseModelId",
        });
    }

    public static initModel() {
        FranchiseLeadModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                description: {
                    type: TEXT,
                    allowNull: false,
                },
                title: {
                    type: STRING,
                    allowNull: false,
                },
                reqArea: {
                    type: DataTypes.INTEGER, // Assuming it's a number
                    allowNull: false,
                },
                investment: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                runningCost: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                bestFor: {
                    type: JSONB,
                    allowNull: false,
                },
                inclusions: {
                    type: JSONB,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "franchise_model",
                timestamps: true,
            }
        );
        return FranchiseLeadModel;
    }

    public static hook() {
        FranchiseLeadModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Franchise Model",
                instance,
                options // Pass it for logging
            );
        });

        // After Update Hook - Log the updated fields of the FranchiseLead
        FranchiseLeadModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Franchise Model",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the FranchiseLead
        FranchiseLeadModel.addHook(
            "afterDestroy",
            async (instance, options) => {
                await RepoProvider.LogRepo.logModelAction(
                    "delete",
                    "Franchise Model",
                    instance,
                    options
                );
            }
        );
    }
}

export { FranchiseLeadModel };
