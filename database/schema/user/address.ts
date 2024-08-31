const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { STRING } = DataTypes;

export const Address = sequelize.define('Address', {
  street: {
    type: STRING,
    allowNull: false
  },
  city: {
    type: STRING,
    allowNull: false
  },
  state: {
    type: STRING,
    allowNull: false
  },
  postalCode: {
    type: STRING,
    allowNull: false
  },
  country: {
    type: STRING,
    allowNull: false
  }
}, {
  timestamps: true
});