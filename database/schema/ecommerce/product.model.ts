const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { BOOLEAN, INTEGER, STRING, ENUM, TEXT, DECIMAL } = DataTypes;
const PRODUCT_TYPE = {
    new: 'new',
    upcoming: 'upcoming',
};

export const Product = sequelize.define('products', {
    name: {
        type: STRING,
        allowNull: false,
    },
    slug: {
        type: STRING,
        allowNull: false,
    },
    description: {
        type: TEXT,
    },
    price: {
        type: INTEGER,
        allowNull: false,
    },
    type: {
        type: ENUM,
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

