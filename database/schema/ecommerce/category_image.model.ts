const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";

export const CategoryImange = sequelize.define('category_images', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'categoryId'
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
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'file_size'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: 'updated_at'
    },
});