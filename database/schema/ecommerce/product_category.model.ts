import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TProductCategoryLink } from "../../../types";
const { INTEGER, DATE, NOW } = DataTypes;

interface OrderItemsCreationAttributes extends Optional<TProductCategoryLink, 'id' | 'createdAt' | 'updatedAt'> { }

class ProductCategoryLinkModel extends Model<TProductCategoryLink, OrderItemsCreationAttributes> implements TProductCategoryLink {
    public id!: number;
    public productId!: number;
    public categoryId!: number;
    public file_name!: string;
    public file_path!: number;
    public original_name!: string;
    public file_size!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProductCategoryLinkModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
        type: INTEGER,
    },
    categoryId: {
        type: INTEGER,
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
    },
}, {
    sequelize,
    tableName: 'products_categories',
    timestamps: true,
});

export { ProductCategoryLinkModel };

