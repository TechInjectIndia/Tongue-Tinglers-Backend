const { DataTypes } = require("sequelize");
import { sequelize } from "../../config";

export const Roles = sequelize.define("admin_roles", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    role_permissions: {  // 'Roles & Permissions relations'
        type: DataTypes.TEXT,
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});
