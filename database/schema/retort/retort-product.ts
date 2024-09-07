import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TRetortProduct } from "../../../types";
import { PRODUCTS_TYPE } from '../../../interfaces';
import { RetortProductImagesModel } from './retort-product_image'
import { RetortProductCategoryModel } from './retort-category'
import { RetortProductCategoryMapModel } from './retort-product_category_map'

const { INTEGER, STRING, TEXT, ENUM, BOOLEAN } = DataTypes;

interface RetortProductsCreationAttributes extends Optional<TRetortProduct, 'id' | 'createdAt' | 'updatedAt'> { }

class RetortProductsModel extends Model<TRetortProduct, RetortProductsCreationAttributes> implements TRetortProduct {
    public id!: number;
    public name!: string;
    public slug!: string;
    public description!: string;
    public price!: string;
    public stock!: string;
    public type!: string;
    public total_ratings!: number;
    public ratings!: number;
    public discount!: string;
    public sold!: string;
    public active!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RetortProductsModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: STRING,
        allowNull: false,
    },
    slug: {
        type: STRING,
        allowNull: false,
    },
    description: {
        type: TEXT,
    },
    price: {
        type: INTEGER,
        allowNull: false,
    },
    type: {
        type: ENUM,
        values: [...Object.values(PRODUCTS_TYPE)]
    },
    stock: {
        type: INTEGER,
        allowNull: false,
    },
    total_ratings: {
        type: INTEGER,
    },
    ratings: {
        type: INTEGER,
    },
    discount: {
        type: INTEGER,
    },
    sold: {
        type: INTEGER,
    },
    active: {
        type: BOOLEAN,
        allowNull: false,
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
    tableName: 'retort_products',
    timestamps: true,
});

RetortProductsModel.hasMany(RetortProductImagesModel, { as: 'images' });

RetortProductsModel.belongsToMany(RetortProductCategoryModel, {
    through: RetortProductCategoryMapModel,
    foreignKey: 'productId',
    otherKey: 'categoryId',
    as: 'categories'
});

export { RetortProductsModel };
