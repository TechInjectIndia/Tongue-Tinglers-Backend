import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { BaseProductOptions, PRODUCT_OPTIONS_STATUS, ProductOptions } from "../../../interfaces/product-options";
import { ProductModel } from "../product/productModel";
import { OptionsValueModel } from "../optionsValue/optionsValueModel";

interface ProductOptionsCreationAttributes extends Optional<ProductOptions, | "id"> {
}

class ProductOptionsModel extends Model<ProductOptions, ProductOptionsCreationAttributes> implements BaseProductOptions{
    id: number;
    product_id: number;
    optionValueId: number;
    price: number;
    stock: number;
    status: PRODUCT_OPTIONS_STATUS;
    images: string;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}

ProductOptionsModel.init({
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
        type: DataTypes.ENUM(PRODUCT_OPTIONS_STATUS.ACTIVE, PRODUCT_OPTIONS_STATUS.INACTIVE),
        defaultValue: PRODUCT_OPTIONS_STATUS.ACTIVE,
        allowNull: false,
    },
    images: {
        type: DataTypes.STRING,
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
}, {
    sequelize,
    modelName: 'ProductOptions',
    tableName: 'product_options',
    timestamps: true
})

ProductOptionsModel.belongsTo(OptionsValueModel, {as: 'optionsValue', foreignKey: 'id'})

export { ProductOptionsModel }