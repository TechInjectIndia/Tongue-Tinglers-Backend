const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { BOOLEAN, INTEGER, STRING, DATE, TEXT, DECIMAL } = DataTypes;
const PRODUCT_TYPE = {
    new: 'New',
    upcoming: 'Upcoming',
};

export const Product = sequelize.define('products', {
    name: {
        type: STRING(50),
        allowNull: false,
    },
    slug: {
        type: STRING(50),
        allowNull: false,
    },
    description: {
        type: TEXT,
    },
    price: {
        type: DECIMAL(20, 2),
        allowNull: false,
    },
    type: {
        type: STRING,
        values: [PRODUCT_TYPE.new, PRODUCT_TYPE.upcoming]
    },
    stock: {
        type: INTEGER,
        allowNull: false,
    },
    total_ratings: {
        type: INTEGER,
    },
    ratings: {
        type: INTEGER,
    },
    discount: {
        type: INTEGER,
    },
    sold: {
        type: INTEGER,
    },
    active: {
        type: BOOLEAN,
        allowNull: false,
    },
});

