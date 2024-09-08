import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
const { STRING, INTEGER } = DataTypes;
import { UserModel } from './user.model'
import { TAddress } from "../../../types";

interface AddressCreationAttributes extends Optional<TAddress, 'id' | 'createdAt' | 'updatedAt'> { }

class AddressModel extends Model<TAddress, AddressCreationAttributes> implements TAddress {
  public id!: number;
  public user_id!: number;
  public street!: string;
  public city!: string;
  public state!: string;
  public postalCode!: string;
  public country!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AddressModel.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: INTEGER,
    allowNull: false
  },
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
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: "updated_at",
  },
}, {
  sequelize,
  tableName: 'address',
  timestamps: true,
});

UserModel.hasMany(AddressModel, {
  foreignKey: "user_id",
});
AddressModel.belongsTo(UserModel, {
  foreignKey: "user_id",
});

export { AddressModel };