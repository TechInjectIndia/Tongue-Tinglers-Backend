const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { INTEGER, DATE, STRING, ENUM } = DataTypes;
const ORDER_STATUS = {
    processed: 'Processing',
    delivered: 'Delivered',
    shipped: 'Shipped',
    cancelled: 'Cancelled',
};

export const Order = sequelize.define('orders', {
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
    total_price: {
        type: INTEGER,
    },
    order_status: {
        type: ENUM,
        values: [ORDER_STATUS.processed, ORDER_STATUS.delivered, ORDER_STATUS.shipped, ORDER_STATUS.shipped, ORDER_STATUS.cancelled]
    },
});

