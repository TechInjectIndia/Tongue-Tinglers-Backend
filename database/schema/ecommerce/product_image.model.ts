const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { INTEGER, STRING, TEXT } = DataTypes;

export const ProductImage = sequelize.define('product_images', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: STRING,
        allowNull: true,
    },
    file_name: {
        type: STRING,
        allowNull: false,
    },
    file_path: {
        type: STRING,
        allowNull: false,
    },
    original_name: {
        type: STRING,
        allowNull: false,
    },
    file_size: {
        type: INTEGER, allowNull: false,
    },
});