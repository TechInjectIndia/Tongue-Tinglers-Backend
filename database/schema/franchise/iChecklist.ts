import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { checkPointsValue, ICheckList } from "../../../interfaces/ichecklist";
import { PdiCheckpointModel } from "./pdiCheckPointModel";
import { FranchiseModelRepo } from "../../../apps/franchise_model/models";
import { FranchiseModel } from "./franchiseModel";
import { FranchiseLeadModel } from "../lead/franchiseModels";
import RepoProvider from "../../../apps/RepoProvider";

// Define the optional attributes for creation
interface IChecklistCreationAttributes extends Optional<ICheckList, "id"> {}

class IChecklistModel
    extends Model<ICheckList, IChecklistCreationAttributes>
    implements ICheckList
{
    id: number;
    title: string;
    checkPoints: Array<number>;
    franchiseModelId: number;
    createdBy: number;
    updatedBy: number | null;
    deletedAt: Date | null;
    deletedBy: Date | null;

    // public static associate() {

    // }

    public static initModel() {
        IChecklistModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                checkPoints: {
                    type: DataTypes.JSONB,
                    // references: {
                    //     model: PdiCheckpointModel,
                    //     key: "id",
                    // },
                    allowNull: false,
                },
                franchiseModelId: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: FranchiseLeadModel,
                        key: "id",
                    },
                    allowNull: true,
                },
                createdBy: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                updatedBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                deletedBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "pdi_checklists",
                timestamps: true,
            }
        );
        return IChecklistModel;
    }

    public static hook() {
        IChecklistModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Checklist",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the FranchiseLead
        IChecklistModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Checklist",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the FranchiseLead
        IChecklistModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Checklist",
                instance,
                options
            );
        });
    }
}

// IChecklistModel.belongsTo(PdiCheckpointModel, { foreignKey: 'id', as: 'checkpoint', constraints: true })
// IChecklistModel.hasMany(PdiCheckpointModel, { foreignKey: 'checkPoints', as: 'checkpoint'})

export { IChecklistModel };
