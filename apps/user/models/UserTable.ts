import { DataTypes, Model, Optional } from "sequelize";


import RepoProvider from "apps/RepoProvider";
import { TUser, USER_STATUS, USER_TYPE } from "../interface/User";
import { sequelize } from "config";


const { INTEGER, STRING, ENUM, JSONB } = DataTypes;

interface UserCreationAttributes
    extends Optional<TUser, "id" | "createdAt" | "updatedAt"> {
}

class UserModel extends Model<TUser, UserCreationAttributes> implements TUser {
    public id!: number;
    public firebaseUid!: string;
    public createdBy!: number;
    public password: string;
    public firstName!: string;
    public profilePhoto!: string;
    public lastName!: string;
    public nameForSearch!: string;
    public email!: string;
    public phoneNumber!: string;
    public type!: USER_TYPE;
    public status!: string;
    public cart: string;
    public refresh_token: string;
    public access_token: string;
    public password_token: string;
    public referralCode: string;
    public referBy: number;
    public lastLoginAt: Date;
    public updatedBy!: number;
    public deletedBy!: number;
    public role: number | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public static initModel() {
        UserModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                firebaseUid: {
                    type: STRING,
                },
                createdBy: {
                    type: INTEGER,
                    allowNull: true,
                },
                password: {
                    type: STRING,
                    allowNull: true,
                },
                profilePhoto: {
                    type: STRING,
                },
                firstName: {
                    type: STRING,
                },
                lastName: {
                    type: STRING,
                },
                nameForSearch: {
                    type: STRING,
                },
                email: {
                    type: STRING,
                },
                phoneNumber: {
                    type: STRING,
                },
                type: {
                    type: ENUM,
                    values: [...Object.values(USER_TYPE)],
                },
                status: {
                    type: ENUM,
                    values: [...Object.values(USER_STATUS)],
                },
                cart: {
                    type: STRING,
                    allowNull: true,
                },
                access_token: {
                    type: STRING,
                    allowNull: true,
                },
                password_token: {
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
                    type: INTEGER,
                },
                deletedBy: {
                    type: INTEGER,
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
            },
            {
                sequelize,
                tableName: "users",
                timestamps: true,
                paranoid: true,
            },
        );
        return UserModel;
    }

    public static associate() {

        // UserModel.hasMany(AffiliateModel, { foreignKey: 'userId', as: 'affiliates' });
    }

    public static hook() {

        UserModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction("create", "User",
                instance, options);
        });

        // After Update Hook - Log the updated fields of the User
        UserModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction("update", "User",
                instance, options);
        });

        // After Destroy Hook - Log the deletion of the User
        UserModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction("delete", "User",
                instance, options);
        });

    }
}

export { UserModel };
