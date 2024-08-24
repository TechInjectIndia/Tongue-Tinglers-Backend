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
            allowNull: true,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contact_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
        },
        profile_photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        last_login_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        last_login_ip: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        refferal_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        refferal_by: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        additional_info: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        user_type: {
            type: DataTypes.ENUM('0', '1', '2') // 0 => admin, 1 => franchisee, 2 => customer
        }
    }
);
