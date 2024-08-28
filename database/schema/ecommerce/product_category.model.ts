const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { INTEGER, DATE, STRING } = DataTypes;

export const ProductCategory = sequelize.define('products_categories', {

    product_id: {
        type: INTEGER,
    },
    category_id: {
        type: INTEGER,
    },
});