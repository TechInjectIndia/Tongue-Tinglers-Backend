import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { Address } from "../../../types";

const { STRING, INTEGER } = DataTypes;

interface AddressCreationAttributes extends Optional<Address, "id"> {}

class AddressModel extends Model<Address, AddressCreationAttributes> implements Address {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;

   
}

AddressModel.init(
  {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    street: { type: STRING, allowNull: false },
    city: { type: STRING, allowNull: false },
    state: { type: STRING, allowNull: false },
    postalCode: { type: STRING, allowNull: false },
    country: { type: STRING, allowNull: false },
    phoneNumber: { type: STRING, allowNull: false },
    firstName: { type: STRING, allowNull: false },
    lastName: { type: STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "addresses",
    timestamps: true,
    paranoid: true,
  }
);

export { AddressModel };
