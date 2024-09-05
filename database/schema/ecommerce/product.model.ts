import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TProduct } from "../../../types";
import { PRODUCTS_TYPE } from '../../../interfaces';
import { ProductImagesModel } from './product_image.model'
import { ProductCategoryModel } from './category.model'
import { ProductCategoryMapModel } from './product_category_map.model'
import { ProductTagModel } from './tag.model'
import { ProductTagMapModel } from './product_tag_map'

const { INTEGER, STRING, TEXT, ENUM, BOOLEAN } = DataTypes;

interface ProductsCreationAttributes extends Optional<TProduct, 'id' | 'createdAt' | 'updatedAt'> { }

class ProductsModel extends Model<TProduct, ProductsCreationAttributes> implements TProduct {
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

ProductsModel.init({
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
    tableName: 'products',
    timestamps: true,
});

ProductsModel.hasMany(ProductImagesModel, { as: 'images' });

ProductsModel.belongsToMany(ProductCategoryModel, {
    through: ProductCategoryMapModel,
    foreignKey: 'productId',
    otherKey: 'categoryId',
    as: 'categories'
});
ProductsModel.belongsToMany(ProductTagModel, {
    through: ProductTagMapModel,
    foreignKey: 'productId',
    otherKey: 'tagId',
    as: 'tags'
});

export { ProductsModel };
