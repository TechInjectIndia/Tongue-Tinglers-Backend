const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { INTEGER, STRING } = DataTypes;

export const OrderItem = sequelize.define('order_items', {
    name: {
        type: STRING,
        allowNull: false,
    },
    slug: {
        type: STRING,
        allowNull: false,
    },
    order_id: {
        type: INTEGER,
        allowNull: false,
    },
    product_id: {
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
});