const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";

export const User = sequelize.define(
    "users",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
        },
        contact_number: {
            type: DataTypes.STRING,
        },
        phone_code: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
        },
        profile_photo: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        last_login_at: {
            type: DataTypes.DATE,
        },
        last_login_ip: {
            type: DataTypes.STRING,
        },
        refresh_token: {
            type: DataTypes.STRING,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        refferal_id: {
            type: DataTypes.STRING,
        },
        refferal_by: {
            type: DataTypes.STRING,
        },
        additional_info: {
            type: DataTypes.TEXT,
        },
        user_type: {
            type: DataTypes.ENUM(0, 1, 2) // 0 => admin, 1 => franchisee, 2 => customer
        }
    }
);
