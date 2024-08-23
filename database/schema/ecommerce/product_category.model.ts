import {DataTypes} from "sequelize";
import { sequelize } from "../../../config";

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
