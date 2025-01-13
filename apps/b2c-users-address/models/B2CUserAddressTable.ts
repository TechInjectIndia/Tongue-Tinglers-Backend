import { sequelize } from "../../../config";
import { DataTypes, Model, Optional } from "sequelize";
import { B2CUserAddressTable } from "../interface/B2CUserAddress";
import { UserModel } from "apps/user/models/UserTable";
import { AddressModel } from "apps/address/models/AddressTable";

interface B2CUserAddressCreationAttributes extends Optional<B2CUserAddressTable, "id"> {}

class B2CUserAddressModel extends Model<B2CUserAddressTable, B2CUserAddressCreationAttributes>implements B2CUserAddressTable {
    id: number;
    userId: number;
    addressId: number;

    public static initModel() {
        B2CUserAddressModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                addressId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "B2CAddress",
                tableName: "b2c_address",
                timestamps: true,
            }
        );
        return B2CUserAddressModel;
    }

    public static associate(){
        B2CUserAddressModel.belongsTo(UserModel, {
            foreignKey: "userId",
            as: "users",
        });
        B2CUserAddressModel.belongsTo(AddressModel, {
            foreignKey: "addressId",
            as: "address",
        });
    }
}

export { B2CUserAddressModel };