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
    order_id: {
        type: INTEGER,
        allowNull: false,
    },
    product_id: {
        type: INTEGER,
        allowNull: true,
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
});