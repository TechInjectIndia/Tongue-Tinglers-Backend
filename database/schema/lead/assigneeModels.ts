import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { UserModel } from "../user/user.model";
import { LeadsModel } from "./lead.model";
import RepoProvider from "../../../apps/RepoProvider";

// Define the attributes for Assign creation (Optional `id` if auto-generated)
interface AssignAttributes {
    id?: number;
    assignedTo: number; // Foreign key referencing UserDetails
    assignedBy: number; // Foreign key referencing UserDetails
    assignedDate: Date;
    leadId: number; // Foreign key referencing LeadsModel
}

// Define the interface for Assign model creation
interface AssignCreationAttributes extends Optional<AssignAttributes, "id"> {}

// Model class
class AssignModel
    extends Model<AssignAttributes, AssignCreationAttributes>
    implements AssignAttributes
{
    public id!: number;
    public assignedTo!: number;
    public assignedBy!: number;
    public assignedDate!: Date;
    public leadId!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
        this.belongsTo(UserModel, {
            foreignKey: "assignedTo",
            as: "assignedToId",
        });
        this.belongsTo(UserModel, {
            foreignKey: "assignedBy",
            as: "assignedById",
        });
        this.belongsTo(LeadsModel, { foreignKey: "leadId", as: "leadData" });
        AssignModel.belongsTo(UserModel, {
            foreignKey: "assignedTo",
            as: "assignedUser",
        });
        AssignModel.belongsTo(UserModel, {
            foreignKey: "assignedBy",
            as: "assignerUser",
        });

        AssignModel.belongsTo(LeadsModel, {
            foreignKey: "leadId",
            as: "lead",
        });
    }

    public static initModel() {
        // Step 2: Initialize the Model
        AssignModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                assignedTo: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: UserModel,
                        key: "id",
                    },
                },
                assignedBy: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: UserModel,
                        key: "id",
                    },
                },
                assignedDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                leadId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: LeadsModel,
                        key: "id",
                    },
                },
            },
            {
                sequelize,
                tableName: "lead_assignments",
                timestamps: true,
            }
        );
        return AssignModel;
    }

    public static hook() {
        AssignModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Lead Assignments",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the Lead Assignments
        AssignModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Lead Assignments",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the Lead Assignments
        AssignModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Lead Assignments",
                instance,
                options
            );
        });
    }
}

export { AssignModel };
