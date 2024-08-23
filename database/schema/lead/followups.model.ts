const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { STRING, TEXT, DATE, INTEGER } = DataTypes;
const STATUS = {
    new: 'New',
};
export const FollowUps = sequelize.define('follow_ups', {
    title: STRING,
    description: TEXT,
    type: TEXT,
    datetime: DATE,
    status: {
        type: INTEGER,
        field: 'status',
        values: [STATUS.new]
    },
});