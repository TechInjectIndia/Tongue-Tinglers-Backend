const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { STRING, TEXT, INTEGER } = DataTypes;

export const Testimonials = sequelize.define("testimonials", {
    user_id: { // Refers to the Users table.
        type: INTEGER,
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
