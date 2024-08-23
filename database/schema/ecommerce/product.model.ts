import {DataTypes} from "sequelize"
import { sequelize } from "../../../config";
const { BOOLEAN, INTEGER, STRING, DATE, TEXT, DECIMAL } = DataTypes;

// totalRatings
// ratings
// discount
// sold
export const Product = sequelize.define('products', {
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
    description: {
        type: TEXT,
    },
    price: {
        type: DECIMAL(20, 2),
        allowNull: false,
    },
    stock: {
        type: INTEGER,
        allowNull: false,
    },
    active: {
        type: BOOLEAN,
        allowNull: false,
    },
});

