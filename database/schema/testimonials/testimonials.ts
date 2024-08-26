const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { STRING, TEXT, INTEGER } = DataTypes;

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
    approved: { // A boolean field to indicate if the testimonial has been approved (useful if testimonials need to be moderated).
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    testimonial_type: { // This could be used to categorize the type of testimonial, such as for a product, service, etc.
        type: STRING,
    },
});
