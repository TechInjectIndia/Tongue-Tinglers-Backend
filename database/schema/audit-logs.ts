const { DataTypes } = require("sequelize");
import { sequelize } from "../../config";

export const AuditLogsModel = sequelize.define("audit_logs", {
    user_id: { // Refers to the Users table.
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    activity_type: { // Type of activity, e.g., 'Role Assignment', 'Permission Change'.
        type: DataTypes.TEXT,
        allowNull: false,
    },
    timestamp: { // When the activity occurred.
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: { // Detailed record of the activity.
        type: DataTypes.TEXT,
        allowNull: false,
    },    
});
