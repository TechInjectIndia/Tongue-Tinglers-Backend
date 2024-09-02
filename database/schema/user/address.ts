const { DataTypes } = require("sequelize");
import { sequelize } from "../../../config";
const { STRING } = DataTypes;
import { UserModel } from './user.model'

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

UserModel.hasMany(Address, {
  foreignKey: "user_id",
});
Address.belongsTo(UserModel, {
  foreignKey: "user_id",
});