const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { STRING, TEXT, INTEGER } = DataTypes;

export const Reviews = sequelize.define("reviews", {
    user_id: { // Refers to the Users table.
        type: INTEGER,
        allowNull: false,
    },
    ReviewText: { // The content of the review
        type: TEXT,
        allowNull: false,
        field: 'review_text'
    },
    Rating: { // Rating given in the review (usually 1 to 5)
        type: INTEGER,
        allowNull: false,
        field: 'rating'
    },
    ReviewDate: { // Date and time when the review was submitted
        type: INTEGER,
        allowNull: false,
        field: 'review_date'
    },
    Approved: { // Whether the review has been approved 
        type: INTEGER,
        allowNull: false,
        field: 'approved'
    },
    ItemID: { // Identifier for the item being reviewed (e.g., product, service)
        type: INTEGER,
        allowNull: false,
        field: 'item_id'
    },
    ItemType: { // Type of item being reviewed (e.g., product, service)
        type: INTEGER,
        allowNull: false,
        field: 'item_type'
    },
});