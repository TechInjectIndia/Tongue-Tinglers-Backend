import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";

export interface ProductCategoryAttributes {
    productId: number;
    categoryId: number;
}

// Define the creation attributes for the ProductCategory model
// Since there are no auto-generated fields here, we don't need optional attributes
export interface ProductCategoryCreationAttributes extends Optional<ProductCategoryAttributes, never> { }

export const ProductCategory = sequelize.define('products_categories', {

    productId: {
        type: DataTypes.INTEGER,
        field: 'productId',
    },
    categoryId: {
        type: DataTypes.INTEGER,
        field: 'categoryId'
    },
});
