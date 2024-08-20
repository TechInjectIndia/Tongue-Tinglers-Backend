const { DataTypes } = require("sequelize");
import { sequelize } from "../../config";

export const Permissions = sequelize.define("admin_permissions", {
    permission_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});
