import {DataTypes} from "sequelize"
import { sequelize } from "../../config";

export const Permissions = sequelize.define("admin_permissions", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});
