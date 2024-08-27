const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { STRING, TEXT, INTEGER, DATE } = DataTypes;

export const Reviews = sequelize.define("reviews", {
    user_id: { // Refers to the Users table.
        type: INTEGER,
        allowNull: false,
    },
    review_text: { // The content of the review
        type: TEXT,
        allowNull: false,
    },
    rating: { // Rating given in the review (usually 1 to 5)
        type: INTEGER,
        allowNull: false,
    },
    approved: { // Whether the review has been approved 
        type: INTEGER,
        allowNull: false,
    },
    item_id: { // Identifier for the item being reviewed (e.g., product, service)
        type: INTEGER,
        allowNull: false,
    },
    item_type: { // Type of item being reviewed (e.g., product, service)
        type: STRING,
        allowNull: false,
    },
});