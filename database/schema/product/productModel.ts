import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { BaseModelIdNumber, PRODUCTS_TYPE, BaseProduct, Product, PRODUCT_STATUS } from "../../../interfaces";
import { BaseProductOptions } from "../../../interfaces/product-options";
import { ProductOptionsModel } from "../product-options/productOptionsModel";
import { CartProductModel } from "../cart-product/cartProductModel";

interface ProductCreationAttributes extends Optional<Product, | "id"> {
}

class ProductModel extends Model<Product, ProductCreationAttributes> implements BaseProduct{
    id: number;
    name: string;   
    MOQ: number;
    category: number;
    description: string;
    images: string[];
    slug: string;
    status: PRODUCT_STATUS;
    type: PRODUCTS_TYPE;
    variationIds: number[];
    productOptionsIds: number[];
    tax_rate_id: number;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}

ProductModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    MOQ: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(PRODUCT_STATUS.ACTIVE, PRODUCT_STATUS.INACTIVE),
        defaultValue: PRODUCT_STATUS.ACTIVE,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('retort', 'packaging'),
        allowNull: false,
    },
    variationIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    },
    productOptionsIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
    },
    tax_rate_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    deletedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        field: "deleted_at",
    },
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true
})

ProductModel.hasMany(ProductOptionsModel, { as: 'options', foreignKey: 'product_id' });
ProductOptionsModel.belongsTo(ProductModel, { as: 'product', foreignKey: 'product_id' });
// ProductModel.hasMany(CartProductModel, {
//     foreignKey: 'product_id',
//     as: 'cartProducts'  // Alias to use if you want to reference CartProduct from Product
// });
export { ProductModel }