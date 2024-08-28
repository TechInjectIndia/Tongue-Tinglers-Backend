const { DataTypes } = require("sequelize");
import { sequelize } from "../../config";
const { BOOLEAN, STRING, DATE, TEXT, ENUM } = DataTypes;

export const Permissions = sequelize.define("admin_permissions", {
    name: {
        type: STRING,
        allowNull: false,
    },
    description: {
        type: TEXT,
    },
    active: {
        type: BOOLEAN,
        allowNull: false,
    }
});
