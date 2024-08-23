const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { INTEGER, STRING, TEXT } = DataTypes;

export const ProductImage = sequelize.define('product_images', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'productId'
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'file_name'
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'file_path'
    },
    originalName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'original_name'
    },
    fileSize: {
        type: DataTypes.INTEGER, allowNull: false,
        field: 'file_size'
    },
});