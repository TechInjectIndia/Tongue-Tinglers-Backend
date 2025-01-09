import { DataTypes, Model, Optional } from "sequelize";
import {
    QuickActionsFilesPayload,
    QuickActionsStatus,
    QuickActionsTable,
} from "../interface/Files";
import { sequelize } from "config";
import { UserModel } from "apps/user/models/UserTable";
import RepoProvider from "apps/RepoProvider";

interface FileCreationAttributes
    extends Optional<QuickActionsTable, "id" | "createdAt" | "updatedAt"> {}

class FileModel
    extends Model<QuickActionsTable, FileCreationAttributes>
    implements QuickActionsFilesPayload
{
    public id!: number;
    public name!: string;
    public message!: string;
    public subject!: string;
    public url!: string[];
    public status: QuickActionsStatus;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
        FileModel.belongsTo(UserModel, {
            foreignKey: "createdBy",
            as: "createdByUser",
            constraints: true,
        });

        FileModel.belongsTo(UserModel, {
            foreignKey: "updatedBy",
            as: "updatedByUser",
            constraints: true,
        });

        FileModel.belongsTo(UserModel, {
            foreignKey: "deletedBy",
            as: "deletedByUser",
            constraints: true,
        });
    }

    public static initModel() {
        FileModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                message: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                subject: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                status: {
                    type: DataTypes.ENUM(...Object.values(QuickActionsStatus)),
                    allowNull: false,
                    defaultValue: QuickActionsStatus.Active,
                },
                url: {
                    type: DataTypes.ARRAY(DataTypes.TEXT),
                    allowNull: true,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: null,
                    field: "deleted_at",
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
            },
            {
                sequelize,
                tableName: "files",
                timestamps: true,
            },
        );
        return FileModel
    }

    public static hook() {
        FileModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Quick Action Files",
                instance,
                options,
            );
        });

        FileModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Quick Action Files",
                instance,
                options,
            );
        });

        FileModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Quick Action Files",
                instance,
                options,
            );
        });
    }
}

export { FileModel };
