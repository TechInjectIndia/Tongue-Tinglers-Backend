// models/Area.ts
import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { IArea } from "../../../interfaces";
import { UserModel } from "../user/user.model";
import RepoProvider from "../../../apps/RepoProvider";
import {RegionModel} from "./RegionsModel";

interface AreaCreationAttributes
    extends Optional<IArea, "id" | "createdAt" | "updatedAt" | "deletedAt"> {}

class AreaModel extends Model<IArea, AreaCreationAttributes> implements IArea {
    public id: number;
    public title: string;

    public createdBy!: number;
    public updatedBy!: number | null;
    public deletedBy!: number | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;

    public static associate() {
        AreaModel.belongsTo(UserModel, {
            foreignKey: "createdBy",
            as: "creator",
            onDelete: "SET NULL",
        });
        AreaModel.belongsTo(UserModel, {
            foreignKey: "updatedBy",
            as: "updater",
            onDelete: "SET NULL",
        });
        AreaModel.belongsTo(UserModel, {
            foreignKey: "deletedBy",
            as: "deleter",
            onDelete: "SET NULL",
        });
        RegionModel.hasMany(AreaModel, {
            foreignKey: "regionId", // Ensure this foreign key exists
            as: "areas",
        });
    }

    public static initModel() {
        AreaModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                title: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                createdBy: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                updatedBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                deletedBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                    field: "created_at",
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                    field: "updated_at",
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: null,
                    field: "deleted_at",
                },
            },
            {
                sequelize,
                tableName: "Areas",
            }
        );
        return AreaModel
    }

    public static hook() {
        AreaModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Areas",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the Areas
        AreaModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Areas",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the Areas
        AreaModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Areas",
                instance,
                options
            );
        });
    }
}

export { AreaModel };
