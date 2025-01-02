import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { BaseProduct, Product, PRODUCT_STATUS, PRODUCTS_TYPE } from "apps/product/interface/Product";
import { ProductOptionsModel } from "../product-options/productOptionsModel";
import { UserModel } from "apps/user/models/UserTable";


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
    tax_rate_id: number;
    vendorId: number;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;

    public addVariation!: (option: ProductOptionsModel | number) => Promise<void>;
    public addVariations!: (options: Array<ProductOptionsModel | number>) => Promise<void>;
    public setVariationses!: (options: Array<ProductOptionsModel | number>) => Promise<void>;
    public getVariationses!: () => Promise<ProductOptionsModel[]>;
    public removeVariations!: (option: ProductOptionsModel | number) => Promise<void>;
    public removeVariationses!: (options: Array<ProductOptionsModel | number>) => Promise<void>;
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
    tax_rate_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    vendorId: {
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

// ProductModel.belongsToMany(ProductOptionsModel, {
//     through: "product_options_join", // Join table name
//     foreignKey: "productId", // Foreign key in the join table
//     otherKey: "product_options_id", // Other foreign key in the join table
//     as: "variations", // Alias for the relationship
// });

// ProductModel.hasMany(ProductOptionsModel, {
//     foreignKey: "product_id", // The foreign key in ProductOptionsModel
//     as: "product_Options", // Alias for the relationship
//   });
  
//   ProductOptionsModel.belongsTo(ProductModel, {
//     foreignKey: "product_id",
//     as: "product", // Alias for the reverse relationship
//   });

// ProductModel.belongsTo(UserModel, {as: 'createdByUser', foreignKey: 'createdBy'})
// ProductModel.belongsTo(UserModel, {as: 'updatedByUser', foreignKey: 'updatedBy'})
// ProductModel.belongsTo(UserModel, {as: 'deletedByUser', foreignKey: 'deletedBy'})


// ProductModel.hasMany(CartProductModel, {
//     foreignKey: 'product_id',
//     as: 'cartProducts'  // Alias to use if you want to reference CartProduct from Product
// });
export { ProductModel }