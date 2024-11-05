import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TOrderItem } from "../../../types";
const { INTEGER, STRING, DATE, NOW } = DataTypes;

interface OrderItemsCreationAttributes extends Optional<TOrderItem, 'id' | 'createdAt' | 'updatedAt'> { }

class OrderItemsModel extends Model<TOrderItem, OrderItemsCreationAttributes> implements TOrderItem {
    public id!: number;
    public name!: string;
    public slug!: string;
    public orderId!: number;
    public userId!: string;
    public productId!: number;
    public isRepeated!: number;
    public price!: number;
    public quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

OrderItemsModel.init({
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
    userId: {
        type: STRING,
        allowNull: true,
    },
    isRepeated: {
        type: INTEGER,
        defaultValue: 0
    },
    productId: {
        type: INTEGER,
        allowNull: true,
    },
    price: {
        type: INTEGER,
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
    tableName: 'order_items',
    timestamps: true,
});

export { OrderItemsModel };

