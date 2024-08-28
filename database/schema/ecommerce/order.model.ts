const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { INTEGER, DATE, STRING } = DataTypes;
const ORDER_STATUS = {
    pending: 'Pending',
    processed: 'Processing',
    delivered: 'Delivered',
    shipped: 'Shipped',
    cancelled: 'Cancelled',
};

export const Order = sequelize.define('orders', {
    id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    order_id: {
        type: STRING,
        unique: true,
    },
    user_id: {
        type: INTEGER,
        allowNull: true,
    },
    tracking_number: {
        type: STRING,
        unique: true,
    },
    shipping_address: {
        type: STRING,
    },
    payment_method: {
        type: STRING,
    },
    totalPrice: {
        type: INTEGER,
    },
    order_status: {
        type: INTEGER,
        values: [ORDER_STATUS.processed, ORDER_STATUS.delivered, ORDER_STATUS.shipped]
    },
});

