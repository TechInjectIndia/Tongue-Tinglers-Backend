const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
import { USER_STATUS, USER_TYPE } from '../../../interfaces';
const { STRING, ENUM } = DataTypes;

export const User = sequelize.define(
    "users",
    {
        createdBy: {
            type: STRING,
            allowNull: true,
        },
        password: {
            type: STRING,
        },
        firstName: {
            type: STRING,
            allowNull: true,
        },
        lastName: {
            type: STRING,
            allowNull: true,
        },
        nameForSearch: {
            type: STRING,
            allowNull: true,
        },
        email: {
            type: STRING,
            allowNull: true,
        },
        userName: {
            type: STRING,
        },
        phoneNumber: {
            type: STRING,
            allowNull: true,
        },
        type: {
            type: ENUM,
            values: [...Object.values(USER_TYPE)]
        },
        status: {
            type: ENUM,
            values: [...Object.values(USER_STATUS)]
        },
        cart: {
            type: STRING,
            allowNull: true,
        },
        updatedBy: {
            type: STRING,
            allowNull: true,
        },
        deletedBy: {
            type: STRING,
            allowNull: true,
        },
        role: {
            type: STRING,
            allowNull: true,
        },
    }
);
