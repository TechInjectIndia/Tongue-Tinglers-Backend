import { DataTypes, Model, Optional, } from "sequelize";
import { sequelize } from "../../../config";
import { TProductCategory } from "../../../types";
const { STRING, TEXT, DATE, INTEGER, NOW, BOOLEAN } = DataTypes;
import { CategoryImageModel } from './category_image.model'

interface ProductCategoryCreationAttributes extends Optional<TProductCategory, 'id' | 'createdAt' | 'updatedAt'> { }

class ProductCategoryModel extends Model<TProductCategory, ProductCategoryCreationAttributes> implements TProductCategory {
    public id!: number;
    public name: string;
    public slug: string;
    public description: string;
    public active: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

ProductCategoryModel.init({
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
    tableName: 'product_category',
    timestamps: true,
});

ProductCategoryModel.hasMany(CategoryImageModel, { as: 'images' });

export { ProductCategoryModel };