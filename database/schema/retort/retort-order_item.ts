import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TRetortOrderItem } from "../../../types";
const { INTEGER, STRING, DATE, NOW } = DataTypes;

interface RetortOrderItemsCreationAttributes extends Optional<TRetortOrderItem, 'id' | 'createdAt' | 'updatedAt'> { }

class RetortOrderItemsModel extends Model<TRetortOrderItem, RetortOrderItemsCreationAttributes> implements TRetortOrderItem {
    public id!: number;
    public name!: string;
    public slug!: string;
    public orderId!: number;
    public productId!: number;
    public price!: string;
    public quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RetortOrderItemsModel.init({
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
    orderId: {
        type: INTEGER,
        allowNull: false,
    },
    productId: {
        type: INTEGER,
        allowNull: true,
    },
    price: {
        type: STRING,
        allowNull: true,
    },
    quantity: {
        type: INTEGER,
        allowNull: true,
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
    tableName: 'retort_order_items',
    timestamps: true,
});

export { RetortOrderItemsModel };

