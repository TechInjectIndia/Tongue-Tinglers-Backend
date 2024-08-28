const { DataTypes } = require("sequelize");
import { sequelize } from "../../config";
const { INTEGER, STRING, DATE, TEXT, ENUM } = DataTypes;

export const AuditLogsModel = sequelize.define("audit_logs", {
    user_id: { // Refers to the Users table.
        type: INTEGER,
        allowNull: false,
    },
    activity_type: { // Type of activity, e.g., 'Role Assignment', 'Permission Change'.
        type: TEXT,
        allowNull: false,
    },
    timestamp: { // When the activity occurred.
        type: STRING,
        allowNull: false,
    },
    description: { // Detailed record of the activity.
        type: TEXT,
        allowNull: false,
    },    
});
