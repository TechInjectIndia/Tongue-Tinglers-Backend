import { DataTypes, Model, Optional, } from "sequelize";
import { sequelize } from "../../../config";
import { IProductCategory } from "../../../interfaces";
import { CategoryImageModel } from './category_image.model'
import { ProductsModel } from './product.model'
import { ProductCategoryMapModel } from './product_category_map.model'
const { STRING, TEXT, DATE, INTEGER, NOW, BOOLEAN } = DataTypes;

interface ProductCategoryCreationAttributes extends Optional<IProductCategory, 'id' | 'createdAt' | 'updatedAt'> { }

class ProductCategoryModel extends Model<IProductCategory, ProductCategoryCreationAttributes> implements IProductCategory {
    public id!: number;
    public name: string;
    public slug: string;
    public description: string;
    public active: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public readonly products?: ProductsModel[];
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