import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TRetortProductCategoryLink } from "../../../types";
const { INTEGER, DATE, NOW } = DataTypes;

interface RetortProductCategoryMapCreationAttributes extends Optional<TRetortProductCategoryLink, 'id' | 'createdAt' | 'updatedAt'> { }

class RetortProductCategoryMapModel extends Model<TRetortProductCategoryLink, RetortProductCategoryMapCreationAttributes> implements TRetortProductCategoryLink {
    public id!: number;
    public productId!: number;
    public categoryId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RetortProductCategoryMapModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
        type: INTEGER,
    },
    categoryId: {
        type: INTEGER,
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        field: "created_at",
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        field: "updated_at",
    },
}, {
    sequelize,
    tableName: 'retort_products_categories',
    timestamps: true,
});

export { RetortProductCategoryMapModel };

