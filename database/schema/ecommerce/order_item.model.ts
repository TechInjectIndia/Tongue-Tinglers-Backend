const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { INTEGER, STRING } = DataTypes;

export const OrderItem = sequelize.define('order_items', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: STRING(50),
        allowNull: false,
    },
    slug: {
        type: STRING(50),
        allowNull: false,
    },
    userId: {
        type: INTEGER,
        allowNull: true,
        field: 'user_id',
    },
    orderId: {
        type: INTEGER,
        allowNull: false,
        field: 'order_id',
    },
    productId: {
        type: INTEGER,
        allowNull: true,
        field: 'product_id',
    },
    price: {
        // type: DECIMAL(20, 2),
        type: INTEGER,
        allowNull: true,
    },
    quantity: {
        type: INTEGER,
        allowNull: true,
    },
    productType: { // retort or product
        type: INTEGER,
        allowNull: false,
    },
});