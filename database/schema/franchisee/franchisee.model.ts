const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { INTEGER, STRING, TEXT, DATE, BOOLEAN } = DataTypes;

export const Franchisee = sequelize.define('franchisee', {
    full_name: STRING,
    password: STRING,
    city: STRING,
    state: STRING,
    zip_code: STRING,
    country: STRING,
    contact_number: STRING,
    phone_code: STRING,
    email: STRING,
    address: STRING,
    refferal_id: STRING,
    refferal_by: STRING,
    additional_info: TEXT,
    last_login_at: {
        type: DATE,
    },
    last_login_ip: {
        type: STRING,
    },
    refresh_token: {
        type: STRING,
    },
    active: {
        type: BOOLEAN,
        allowNull: false,
    },
});