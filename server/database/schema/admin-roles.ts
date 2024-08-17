const { DataTypes } = require("sequelize");
import { sequelize } from "../../config";

export const AdminRole = sequelize.define("admin_roles", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});
