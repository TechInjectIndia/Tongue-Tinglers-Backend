const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { INTEGER, STRING, DATE } = DataTypes;

export const CategoryImange = sequelize.define('category_images', {
    category_id: {
        type: STRING,
        allowNull: false,
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
        type: INTEGER,
        allowNull: false,
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