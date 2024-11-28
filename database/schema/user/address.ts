import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";

const { STRING, INTEGER } = DataTypes;
import { UserModel } from "./user.model";
import { IAddress } from "../../../types";

// import {TAddress} from "../../../types";

interface AddressCreationAttributes extends Optional<IAddress, "id" | "createdAt" | "updatedAt"> {
}

class AddressModel extends Model<IAddress, AddressCreationAttributes> implements IAddress {
    public createdBy: number;
    public updatedBy: number | null;
    public deletedBy: number | null;
    public id!: number;
    public street!: string;
    public city!: string;
    public state!: string;
    public postalCode!: string;
    public country!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
    public readonly deletedAt!: Date | null;
}

AddressModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    street: {
        type: STRING,
        allowNull: false,
    },
    city: {
        type: STRING,
        allowNull: false,
    },
    state: {
        type: STRING,
        allowNull: false,
    },
    postalCode: {
        type: STRING,
        allowNull: false,
    },
    country: {
        type: STRING,
        allowNull: false,
    },
    createdBy: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: "id",
        },
    },
    updatedBy: {
        type: INTEGER,
        allowNull: true,
        references: {
            model: UserModel,
            key: "id",
        },
    },
    deletedBy: {
        type: INTEGER,
        allowNull: true,
        references: {
            model: UserModel,
            key: "id",
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        field: "updated_at",
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        field: "updated_at",
    },
}, {
    sequelize,
    tableName: "address",
    timestamps: true,
    paranoid: true,
});

export { AddressModel };
