import { DataTypes, Model, Optional } from "sequelize";

import { BaseProductOptions, PRODUCT_OPTIONS_STATUS, ProductOptions } from "apps/product/interface/ProductOptions";
import { OptionsValueModel } from "apps/optionsValue/models/OptionValueTable";
import { sequelize } from "config";
import RepoProvider from "apps/RepoProvider";

interface ProductOptionsCreationAttributes
    extends Optional<ProductOptions, "id"> {}

class ProductVariationsModel
    extends Model<ProductOptions, ProductOptionsCreationAttributes>
    implements BaseProductOptions
{
    id: number;
    product_id: number;
    optionValueId: number;
    price: number;
    stock: number;
    status: PRODUCT_OPTIONS_STATUS;
    images: string[];
    createdBy: number;
    updatedBy: number;
    deletedBy: number;

    public static associate() {
        ProductVariationsModel.belongsTo(OptionsValueModel, {
            as: "optionsValue",
            foreignKey: "optionValueId",
        });
    }

    public static initModel() {
        ProductVariationsModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                product_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                optionValueId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                price: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                stock: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.ENUM(
                        PRODUCT_OPTIONS_STATUS.ACTIVE,
                        PRODUCT_OPTIONS_STATUS.INACTIVE
                    ),
                    defaultValue: PRODUCT_OPTIONS_STATUS.ACTIVE,
                    allowNull: false,
                },
                images: {
                    type: DataTypes.ARRAY(DataTypes.STRING),
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
                modelName: "Variations",
                tableName: "variations",
                timestamps: true,
            }
        );
        return ProductVariationsModel;
    }

    public static hook() {
        ProductVariationsModel.addHook(
            "afterCreate",
            async (instance, options) => {
                await RepoProvider.LogRepo.logModelAction(
                    "create",
                    "Variations",
                    instance,
                    options
                );
            }
        );

        // After Update Hook - Log the updated fields of the Variations
        ProductVariationsModel.addHook(
            "afterUpdate",
            async (instance, options) => {
                // Now call logModelAction as Variations
                await RepoProvider.LogRepo.logModelAction(
                    "update",
                    "Variations",
                    instance,
                    options
                );
            }
        );

        // After Destroy Hook - Log the deletion of the Variations
        ProductVariationsModel.addHook(
            "afterDestroy",
            async (instance, options) => {
                await RepoProvider.LogRepo.logModelAction(
                    "delete",
                    "Variations",
                    instance,
                    options
                );
            }
        );
    }
}

export { ProductVariationsModel };
