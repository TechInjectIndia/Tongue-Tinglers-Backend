const { DataTypes } = require("sequelize");
import { sequelize } from "../../config";

export const Admin = sequelize.define(
    "admins",
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
            type: DataTypes.INTEGER,
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
    }
);
