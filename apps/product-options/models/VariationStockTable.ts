import { DataTypes, Model, Optional } from "sequelize";
import { VariationStockPayload, VariationStockTable } from "../interface/variationStock";
import RepoProvider from "apps/RepoProvider";
import { sequelize } from "config";
import { UserModel } from "apps/user/models/UserTable";

interface VariationStockCreationAttributes extends Optional<VariationStockTable, "id"> { }

class VariationStockModel extends Model<VariationStockTable, VariationStockCreationAttributes> implements VariationStockPayload {
    public id!: number;
    public stock!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date;

    public static associate(){
        VariationStockModel.belongsTo(UserModel, {
            foreignKey: "createdBy",
            as: "createdByUser",
        });
        VariationStockModel.belongsTo(UserModel, {
            foreignKey: "updatedBy",
            as: "updatedByUser",
        });
        VariationStockModel.belongsTo(UserModel, {
            foreignKey: "deletedBy",
            as: "deletedByUser",
        });
    }


    public static initModel() {
        VariationStockModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                stock: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                createdBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
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
                tableName: "variation_stock",
                paranoid: true,
                timestamps: true,
            }
        );
        return VariationStockModel;
    }

    public static hook() {
        VariationStockModel.addHook(
            "afterCreate",
            async (instance, options) => {
                await RepoProvider.LogRepo.logModelAction(
                    "create",
                    "Variations Stock",
                    instance,
                    options
                );
            }
        );

        VariationStockModel.addHook(
            "afterUpdate",
            async (instance, options) => {
                // Now call logModelAction as Variations
                await RepoProvider.LogRepo.logModelAction(
                    "update",
                    "Variations Stock",
                    instance,
                    options
                );
            }
        );

        VariationStockModel.addHook(
            "afterDestroy",
            async (instance, options) => {
                await RepoProvider.LogRepo.logModelAction(
                    "delete",
                    "Variations Stock",
                    instance,
                    options
                );
            }
        );
    }

}

export { VariationStockModel }