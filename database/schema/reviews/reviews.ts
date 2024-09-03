import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TReviews } from "../../../types";
import { REVIEWS_ITEM_TYPE } from '../../../interfaces';
const { INTEGER, STRING, TEXT, ENUM } = DataTypes;

interface ReviewsCreationAttributes extends Optional<TReviews, 'id' | 'createdAt' | 'updatedAt'> { }

class ReviewsModel extends Model<TReviews, ReviewsCreationAttributes> implements TReviews {
    public id!: number;
    public user_id!: number;
    public review_text!: string;
    public rating!: number;
    public item_id!: number;
    public item_type!: string;
    public approved!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ReviewsModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },    
    user_id: { // Refers to the Users table.
        type: INTEGER,
        allowNull: false,
    },
    review_text: { // The content of the review
        type: TEXT,
        allowNull: false,
    },
    rating: { // An optional field for a rating system (usually 1 to 5).
        type: STRING,
    },
    approved: { // To indicate if the testimonial has been approved (useful if Reviews need to be moderated).
        type: INTEGER,
    },
    item_id: { // Identifier for the item being reviewed (e.g., franchise id)
        type: INTEGER,
    },
    item_type: {// Type of item being reviewed (e.g., product, service)
        type: ENUM,
        values: [...Object.values(REVIEWS_ITEM_TYPE)]
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
    tableName: 'Reviews',
    timestamps: true,
});

export { ReviewsModel };
