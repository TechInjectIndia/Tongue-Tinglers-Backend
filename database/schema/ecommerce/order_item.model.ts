import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TOrderItem } from "../../../types";
const { INTEGER, STRING, DATE, NOW } = DataTypes;

interface OrderItemsCreationAttributes extends Optional<TOrderItem, 'id' | 'createdAt' | 'updatedAt'> { }

class OrderItemsModel extends Model<TOrderItem, OrderItemsCreationAttributes> implements TOrderItem {
    public id!: number;
    public orderId: string;
    public userId: string;
    public productId: number;
    public productType: string;
    public quantity: number;
    public price: number;
    public subtotal: number;
    public isRepeated: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

OrderItemsModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    productType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
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

