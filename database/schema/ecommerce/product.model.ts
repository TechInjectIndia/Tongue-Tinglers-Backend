// products.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TProduct } from "../../../types";
import { PRODUCTS_TYPE } from '../../../interfaces';
import { ProductImagesModel } from './product_image.model';
import { VendorModel } from './vendorsModel';
import { ProductTagModel } from './tag.model';
import { ProductTagMapModel } from './product_tag_map';
import { StockModel } from './stockModel';

const { INTEGER, STRING, TEXT, ENUM, BOOLEAN } = DataTypes;

interface ProductsCreationAttributes extends Optional<TProduct, 'id' | 'createdAt' | 'updatedAt'> { }

class ProductsModel extends Model<TProduct, ProductsCreationAttributes> implements TProduct {
    public id!: number;
    public name!: string;
    public vendorId?: string | null;
    public slug!: string;
    public description!: string;
    public price!: number;
    public type!: PRODUCTS_TYPE;
    public total_ratings!: number;
    public ratings!: number;
    public discount!: number;
    public sold!: number;
    public active!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
    }
}

ProductsModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    vendorId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: VendorModel,
            key: "id",
        },
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
        values: [...Object.values(PRODUCTS_TYPE)],
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

// Relationships
ProductsModel.hasMany(ProductImagesModel, { as: 'images' });

ProductsModel.belongsToMany(ProductTagModel, {
    through: ProductTagMapModel,
    foreignKey: 'productId',
    otherKey: 'tagId',
    as: 'tags',
});

// Relationship with StockModel
ProductsModel.hasOne(StockModel, { foreignKey: 'productId', as: 'stock' });
ProductsModel.belongsTo(VendorModel, { foreignKey: 'vendorId', as: 'vendorData', });

export { ProductsModel };
