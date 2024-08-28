const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { BOOLEAN, STRING, DATE, TEXT, ENUM } = DataTypes;

export const User = sequelize.define(
    "users",
    {
        email: {
            type: STRING,
            allowNull: false,
        },
        password: {
            type: STRING,
            allowNull: true,
        },
        full_name: {
            type: STRING,
            allowNull: true,
        },
        contact_number: {
            type: STRING,
            allowNull: true,
        },
        phone_code: {
            type: STRING,
            allowNull: true,
        },
        role: {
            type: STRING,
        },
        profile_photo: {
            type: STRING,
            allowNull: true,
        },
        address: {
            type: STRING,
            allowNull: true,
        },
        last_login_at: {
            type: DATE,
            allowNull: true,
        },
        last_login_ip: {
            type: STRING,
            allowNull: true,
        },
        refresh_token: {
            type: STRING,
            allowNull: true,
        },
        active: {
            type: BOOLEAN,
            allowNull: false,
        },
        refferal_id: {
            type: STRING,
            allowNull: true,
        },
        refferal_by: {
            type: STRING,
            allowNull: true,
        },
        additional_info: {
            type: TEXT,
            allowNull: true,
        },
        user_type: {
            type: ENUM('0', '1', '2') // 0 => admin, 1 => franchisee, 2 => customer
        }
    }
);
