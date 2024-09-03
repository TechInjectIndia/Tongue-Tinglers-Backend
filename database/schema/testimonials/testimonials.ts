import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TTestimonials } from "../../../types";
import { TESTIMONIAL_ITEM_TYPE } from '../../../interfaces';
const { INTEGER, STRING, TEXT, ENUM } = DataTypes;

interface TestimonialsCreationAttributes extends Optional<TTestimonials, 'id' | 'createdAt' | 'updatedAt'> { }

class TestimonialsModel extends Model<TTestimonials, TestimonialsCreationAttributes> implements TTestimonials {
    public id!: number;
    public user_id!: number;
    public testimonial_text!: string;
    public rating!: number;
    public item_id!: string;
    public item_type!: string;
    public approved!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TestimonialsModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },    
    user_id: { // Refers to the Users table.
        type: INTEGER,
        allowNull: false,
    },
    testimonial_text: { // The main content of the testimonial.
        type: TEXT,
    },
    rating: { // An optional field for a rating system (usually 1 to 5).
        type: INTEGER,
    },
    approved: { // To indicate if the testimonial has been approved (useful if testimonials need to be moderated).
        type: INTEGER,
    },
    item_id: { // Identifier for the item being reviewed (e.g., franchise id)
        type: INTEGER,
    },
    item_type: {// Type of item being reviewed (e.g., franchise)
        type: ENUM,
        values: [...Object.values(TESTIMONIAL_ITEM_TYPE)]
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
    },
}, {
    sequelize,
    tableName: 'testimonials',
    timestamps: true,
});

export { TestimonialsModel };
