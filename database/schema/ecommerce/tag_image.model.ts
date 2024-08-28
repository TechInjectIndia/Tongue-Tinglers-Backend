const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { INTEGER, STRING, TEXT, DATE } = DataTypes;

export const TagImage = sequelize.define('tag_images', {
    tag_id: {
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