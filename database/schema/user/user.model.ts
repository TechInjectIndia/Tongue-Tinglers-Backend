import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { USER_STATUS, USER_TYPE, UserInformation } from '../../../interfaces';
import { TUser } from "../../../types";
const { INTEGER, STRING, ENUM, UUIDV4, JSONB } = DataTypes;

interface UserCreationAttributes extends Optional<TUser, 'id' | 'createdAt' | 'updatedAt'> { }

class UserModel extends Model<TUser, UserCreationAttributes> implements TUser {
    public id!: string;
    public firebaseUid!: string;
    public createdBy!: string;
    public password: string;
    public firstName!: string;
    public profilePhoto!: string;
    public lastName!: string;
    public nameForSearch!: string;
    public email!: string;
    public userName!: string;
    public phoneNumber!: string;
    public type!: USER_TYPE;
    public status!: string;
    public cart: string;
    public refresh_token: string;
    public access_token: string;
    public referralCode: string;
    public referBy: UserInformation;
    public lastLoginAt: Date;
    public updatedBy!: string;
    public deletedBy!: string;
    public role: number | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

UserModel.init({
    id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4
    },
    firebaseUid: {
        type: STRING
    },
    createdBy: {
        type: STRING
    },
    password: {
        type: STRING,
        allowNull: true,
    },
    profilePhoto: {
        type: STRING
    },
    firstName: {
        type: STRING
    },
    lastName: {
        type: STRING
    },
    nameForSearch: {
        type: STRING
    },
    email: {
        type: STRING
    },
    userName: {
        type: STRING,
    },
    phoneNumber: {
        type: STRING
    },
    type: {
        type: ENUM,
        values: [...Object.values(USER_TYPE)]
    },
    status: {
        type: ENUM,
        values: [...Object.values(USER_STATUS)]
    },
    cart: {
        type: STRING,
        allowNull: true,
    },
    access_token: {
        type: STRING,
        allowNull: true,
    },
    referralCode: {
        type: STRING,
        allowNull: true,
    },
    referBy: {
        type: JSONB,
        allowNull: true,
    },
    refresh_token: {
        type: STRING,
        allowNull: true,
    },
    updatedBy: {
        type: STRING
    },
    deletedBy: {
        type: STRING
    },
    role: {
        type: INTEGER,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
    },
    lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "lastLoginAt",
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        field: "deleted_at",
    },
}, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    paranoid: true
});

export { UserModel };
