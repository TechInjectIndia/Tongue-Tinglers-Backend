import {DataTypes, Model, Optional, Transaction} from "sequelize";
import {sequelize} from "../../../config";
import {
    IProductTable,
    PRODUCT_STATUS,
    PRODUCTS_TYPE,
} from "apps/product/interface/Product";

import RepoProvider from "apps/RepoProvider";
import {
    ProductVariationsModel
} from "../../product-options/models/ProductVariationTable";
import {UserModel} from "apps/user/models/UserTable";
import {CartProductModel} from "../../cart-products/model/CartProductTable";
import { VariationTableModel } from "./variationTable";


interface ProductCreationAttributes
    extends Optional<IProductTable, "id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "deletedBy" | "deletedAt"> {
}

class ProductModel extends Model<IProductTable, ProductCreationAttributes>
    implements IProductTable {
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
    public createdBy!: number;
    public updatedBy!: number | null;
    public deletedBy!: number | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;

    public addVariation!: (
        option: ProductVariationsModel | number
    ) => Promise<void>;
    public addVariations!: (
        options: Array<ProductVariationsModel | number>,
        // transaction: Transaction
    ) => Promise<void>;
    public setVariationses!: (
        options: Array<ProductVariationsModel | number>
    ) => Promise<void>;
    public getVariationses!: () => Promise<ProductVariationsModel[]>;
    public removeVariations!: (
        option: ProductVariationsModel | number
    ) => Promise<void>;
    public removeVariationses!: (
        options: Array<ProductVariationsModel | number>
    ) => Promise<void>;

    public static associate() {
        ProductModel.belongsToMany(ProductVariationsModel, {
            through: "productVariationsJoin", // Join table name
            foreignKey: "productId",
            otherKey: "productOptionId",
            as: "variations", // Alias for shipping addresses
        });

        // ProductModel.belongsToMany(ProductOptionsModel, {
        //     through: "product_options_join", // Join table name
        //     foreignKey: "productId", // Foreign key in the join table
        //     otherKey: "product_options_id", // Other foreign key in the join
        // table as: "variations", // Alias for the relationship });

        // ProductModel.hasMany(ProductOptionsModel, {
        //     foreignKey: "product_id", // The foreign key in
        // ProductOptionsModel as: "product_Options", // Alias for the
        // relationship });

        //   ProductOptionsModel.belongsTo(ProductModel, {
        //     foreignKey: "product_id",
        //     as: "product", // Alias for the reverse relationship
        //   });

        ProductModel.belongsTo(UserModel,
            {as: 'createdByUser', foreignKey: 'createdBy'})
        ProductModel.belongsTo(UserModel,
            {as: 'updatedByUser', foreignKey: 'updatedBy'})
        ProductModel.belongsTo(UserModel,
            {as: 'deletedByUser', foreignKey: 'deletedBy'})

        ProductModel.hasMany(CartProductModel, {
            foreignKey: 'product_id',
            as: 'cartProducts'  // Alias to use if you want to reference
                                // CartProduct from Product
        });
        ProductModel.hasMany(VariationTableModel,{
            foreignKey: 'productId',
            as: 'variationTables'
        })
    }

    public static initModel() {
        ProductModel.init(
            {
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
                    type: DataTypes.ENUM(
                        PRODUCT_STATUS.ACTIVE,
                        PRODUCT_STATUS.INACTIVE
                    ),
                    defaultValue: PRODUCT_STATUS.ACTIVE,
                    allowNull: false,
                },
                type: {
                    type: DataTypes.ENUM("retort", "packaging"),
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
            },
            {
                sequelize,
                modelName: "Product",
                tableName: "products",
                timestamps: true,
            }
        );
        return ProductModel;
    }

    public static hook() {
        ProductModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Product",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the Product
        ProductModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Product",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the Product
        ProductModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Product",
                instance,
                options
            );
        });
    }

    

}

export {ProductModel};
