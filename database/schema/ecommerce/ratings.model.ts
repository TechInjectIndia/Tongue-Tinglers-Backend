import {DataTypes} from "sequelize"
import { sequelize } from "../../../config";
const { BOOLEAN, STRING } = DataTypes;

export const Ratings = sequelize.define('ratings', {
    review: STRING,
    rating: STRING,
    status: {
        type: BOOLEAN,
        allowNull: false,
    },
});
