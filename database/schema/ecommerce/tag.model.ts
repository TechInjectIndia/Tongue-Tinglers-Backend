import {DataTypes} from "sequelize"
import { sequelize } from "../../../config";
const { BOOLEAN, STRING, DATE } = DataTypes;

export const Tag = sequelize.define('tags', {
    name: STRING,
    slug: { type: STRING, allowNull: false },
    description: STRING,
    active: {
        type: BOOLEAN,
        allowNull: false,
    },
});
