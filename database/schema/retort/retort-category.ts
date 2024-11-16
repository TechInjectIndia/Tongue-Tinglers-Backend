import { DataTypes, Model, Optional, } from "sequelize";
import { sequelize } from "../../../config";
import { TRetortProductCategory } from "../../../types";
const { STRING, TEXT, DATE, INTEGER, NOW, BOOLEAN } = DataTypes;
import { RetortCategoryImageModel } from './retort-category_image'
import { RetortProductsModel } from './retort-product'

interface RetortProductCategoryCreationAttributes extends Optional<TRetortProductCategory, 'id' | 'createdAt' | 'updatedAt'> { }

class RetortProductCategoryModel extends Model<TRetortProductCategory, RetortProductCategoryCreationAttributes> implements TRetortProductCategory {
    public id!: number;
    public name: string;
    public slug: string;
    public description: string;
    public active: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public readonly products?: RetortProductsModel[];
}

RetortProductCategoryModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: STRING
    },
    slug: {
        type: STRING
    },
    description: {
        type: TEXT
    },
    active: {
        type: BOOLEAN,
        defaultValue: false,
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
    }
}, {
    sequelize,
    tableName: 'retort_product_category',
    timestamps: true,
});

RetortProductCategoryModel.hasMany(RetortCategoryImageModel, { as: 'images' });

export { RetortProductCategoryModel };