import { DataTypes, Model, Optional, } from "sequelize";
import { sequelize } from "../../../config";
import { BaseProductsCategory, ProductsCategory, PRODUCT_CATEGORY_STATUS, CATEGORY_TYPE } from "../../../interfaces/products_category";
import { P_CATEGORY_TYPE, PRODUCT_STATUS } from "../../../interfaces";
import { ProductModel } from "../product/productModel";

interface ProductsCategoryCreationAttributes extends Optional<ProductsCategory, 'id'> { }

class ProductsCategoryModel extends Model<ProductsCategory, ProductsCategoryCreationAttributes> implements BaseProductsCategory {
   name: string;
   slug: string;
   description: string;
   status: PRODUCT_CATEGORY_STATUS; 
   type: CATEGORY_TYPE;
   createdBy: number;
   updatedBy: number;
   deletedBy: number;
   createdAt: Date; 
   updatedAt: Date;
   deletedAt: Date;
}

ProductsCategoryModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    slug: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM(PRODUCT_STATUS.ACTIVE, PRODUCT_STATUS.INACTIVE),
    },
    type: {
        type: DataTypes.ENUM(CATEGORY_TYPE.RETORT, CATEGORY_TYPE.PACKAGING),
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
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        field: "deleted_at",
    },
}, {
    sequelize,
    tableName: 'products_category',
    timestamps: true,
});

ProductsCategoryModel.hasMany(ProductModel, {as: "product_category", foreignKey: "category"})
ProductModel.belongsTo(ProductsCategoryModel, {as: "productCategory", foreignKey: "category"})

export { ProductsCategoryModel };