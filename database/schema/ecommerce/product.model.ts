import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TProduct } from "../../../types";
import { PRODUCTS_TYPE } from "../../../interfaces";
import { ProductImagesModel } from "./product_image.model";
import { VendorModel } from "./vendorsModel";
import { ProductTagModel } from "./tag.model";
import { ProductTagMapModel } from "./product_tag_map";
import { StockModel } from "./stockModel";

const { INTEGER, STRING, TEXT, ENUM, BOOLEAN } = DataTypes;

// Define the creation attributes for the Product model
interface ProductsCreationAttributes extends Optional<TProduct, "id" | "createdAt" | "updatedAt"> {}

// Define the main Product model
class ProductsModel extends Model<TProduct, ProductsCreationAttributes> implements TProduct {
    public id!: number;
    public name!: string;
    public vendorId!: string | null;
    public slug!: string;
    public description!: string;
    public price!: number;
    public type!: PRODUCTS_TYPE;
    public total_ratings!: number;
    public ratings!: number;
    public discount!: number;
    public sold!: number;
    public min_qty_order!: number;
    public active!: boolean;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Relationships (read-only)
    public readonly images?: ProductImagesModel[];
    public readonly tags?: ProductTagModel[];
    public readonly stock?: StockModel;
    public readonly vendorData?: VendorModel;

    public static associate() {
        // Define relationships here
        ProductsModel.hasMany(ProductImagesModel, { foreignKey: "productId", as: "images" });

        ProductsModel.belongsToMany(ProductTagModel, {
            through: ProductTagMapModel,
            foreignKey: "productId",
            otherKey: "tagId",
            as: "tags",
        });

        ProductsModel.hasOne(StockModel, { foreignKey: "productId", as: "stock" });
        ProductsModel.belongsTo(VendorModel, { foreignKey: "vendorId", as: "vendorData" });
    }
}

// Initialize the Product model
ProductsModel.init(
    {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vendorId: {
            type: STRING,
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
            defaultValue: 0,
        },
        ratings: {
            type: INTEGER,
            defaultValue: 0,
        },
        discount: {
            type: INTEGER,
            defaultValue: 0,
        },
        sold: {
            type: INTEGER,
            defaultValue: 0,
        },
        min_qty_order: {
            type: INTEGER,
            defaultValue: 1,
        },
        active: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
    },
    {
        sequelize,
        tableName: "products",
        timestamps: true,
    }
);

// Export the model
export { ProductsModel };
