const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { STRING, TEXT, INTEGER, ENUM, BOOLEAN } = DataTypes;

export const Testimonials = sequelize.define("testimonials", {
    user_id: { // Refers to the Users table.
        type: INTEGER,
        allowNull: false,
    },
    testimonial_text: { // The main content of the testimonial.
        type: TEXT,
    },
    rating: { // An optional field for a rating system (usually 1 to 5).
        type: STRING,
    },
    date_submitted: { // The date and time when the testimonial was submitted.
        type: STRING,
    },
    approved: { // To indicate if the testimonial has been approved (useful if testimonials need to be moderated).
        type: INTEGER,
    },
    item_id: { // Identifier for the item being reviewed (e.g., franchise id)
        type: INTEGER,
    },
    item_type: {// Type of item being reviewed (e.g., franchise)
        type: ENUM,
        values: ['product', 'franchise']
    },
});
