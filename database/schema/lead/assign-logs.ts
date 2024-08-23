import {DataTypes} from "sequelize"
import { sequelize } from "../../../config";
const { STRING, TEXT, DATE, INTEGER } = DataTypes;

export const AssignLogsModel = sequelize.define("assign_logs", {
    user_id: { // Refers to the Users table.
        type: INTEGER,
        allowNull: false,
    },
    activity_type: { // Type of activity, e.g., 'Lead Assignment'
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
