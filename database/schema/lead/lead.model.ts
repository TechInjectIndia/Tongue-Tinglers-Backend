const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { STRING, TEXT, DATE, INTEGER } = DataTypes;
const LEAD_STATUS = {
    new: 'New',
};
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
    lead_source: TEXT,
    lead_assign_to: INTEGER,
    status: {
        type: INTEGER,
        field: 'status',
        values: [LEAD_STATUS.new]
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