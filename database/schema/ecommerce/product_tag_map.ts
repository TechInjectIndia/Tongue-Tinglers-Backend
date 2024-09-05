import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TProductTagLink } from "../../../types";
const { INTEGER, DATE, NOW } = DataTypes;

interface OrderItemsCreationAttributes extends Optional<TProductTagLink, 'id' | 'createdAt' | 'updatedAt'> { }

class ProductTagMapModel extends Model<TProductTagLink, OrderItemsCreationAttributes> implements TProductTagLink {
    public id!: number;
    public productId!: number;
    public tagId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProductTagMapModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
        type: INTEGER,
    },
    tagId: {
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
    tableName: 'products_tags',
    timestamps: true,
});

export { ProductTagMapModel };

