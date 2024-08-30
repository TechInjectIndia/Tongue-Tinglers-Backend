const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { STRING, TEXT, DATE, INTEGER, ENUM } = DataTypes;

export const Lead = sequelize.define('leads', {
    name: STRING,
    city: STRING,
    state: STRING,
    zip_code: STRING,
    country: STRING,
    phone_number: STRING,
    email: STRING,
    address: STRING,
    additional_info: TEXT,
    source: {
        type: ENUM,
        values: ['Admin', 'Website', 'Others']
    },
    follow_date: DATE,
    created_by: INTEGER,
    assigned_to: INTEGER,
    status: {
        type: ENUM,
        values: ['New']
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