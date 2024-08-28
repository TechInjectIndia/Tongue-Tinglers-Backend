const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { INTEGER, STRING, DATE } = DataTypes;

export const CategoryImange = sequelize.define('category_images', {
    categoryId: {
        type: STRING,
        allowNull: false,
        field: 'categoryId'
    },
    fileName: {
        type: STRING,
        allowNull: false,
        field: 'file_name'
    },
    filePath: {
        type: STRING,
        allowNull: false,
        field: 'file_path'
    },
    originalName: {
        type: STRING,
        allowNull: false,
        field: 'original_name'
    },
    fileSize: {
        type: INTEGER,
        allowNull: false,
        field: 'file_size'
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: 'created_at'
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: 'updated_at'
    },
});