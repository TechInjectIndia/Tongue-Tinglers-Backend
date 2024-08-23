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

//shippingAddress
//paymentMethod
// totalPrice
// paymentMethod
export const Order = sequelize.define('orders', {
    id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    orderId: {
        type: STRING,
        unique: true,
        field: 'order_id'
    },
    userId: {
        type: INTEGER,
        allowNull: true,
        field: 'userId',
    },
    trackingNumber: {
        type: STRING,
        unique: true,
        field: 'tracking_number'
    },
    orderStatus: {
        type: INTEGER,
        field: 'order_status',
        values: [ORDER_STATUS.processed, ORDER_STATUS.delivered, ORDER_STATUS.shipped]
    },
});

