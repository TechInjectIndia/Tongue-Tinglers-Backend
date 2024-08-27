const { DataTypes } = require("sequelize");
import { sequelize } from "../../config";
const { STRING, TEXT, INTEGER } = DataTypes;

export const Settings = sequelize.define("settings", {
    key: { // Setting key, must be unique
        type: STRING,
        allowNull: false,
    },
    value: { // Setting value stored as text (you can use JSON for complex structures)
        type: TEXT,
    },
    type: { // Type of the value (e.g., 'string', 'number', 'boolean', 'json')
        type: STRING,
        allowNull: false,
    },
    category: { // Optional category to group settings (e.g., 'general', 'user')
        type: INTEGER, 
        allowNull: false,
    },
    environment: {
        type: INTEGER, // Optional environment (e.g., 'production', 'development')
        allowNull: false,
    },    
});
