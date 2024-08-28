const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { BOOLEAN, INTEGER, STRING, DATE, TEXT, DECIMAL } = DataTypes;

export const Category = sequelize.define('categories', {
    name: {
        type: STRING(50),
        allowNull: false,
    },
    slug: {
        type: STRING(50),
        allowNull: false,
    },
    description: {
        type: STRING(50),
    },
    active: {
        type: BOOLEAN,
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