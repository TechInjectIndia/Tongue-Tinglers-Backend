import { Model, DataTypes, Optional, } from 'sequelize';
import { sequelize } from "../../../config";
import { UserAddressAttributes } from "../../../interfaces";
import { UserModel } from './user.model';

// Optional attributes for model creation
interface UserAddressCreationAttributes extends Optional<UserAddressAttributes, 'id' | 'gstin'> { }

// Define the UserAddress model class
class UserAddressModel extends Model<UserAddressAttributes, UserAddressCreationAttributes> implements UserAddressAttributes {
    public id!: string;
    public userId!: string;

    // Billing address properties
    public title!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public phone!: string;
    public gstin?: string;
    public address!: string;
    public houseNo!: string;
    public city!: string;
    public state!: string;
    public country!: string;
    public zipCode!: string;
    public isActive!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the UserAddress model
UserAddressModel.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // Billing address fields
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gstin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        houseNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize, // Your Sequelize instance
        tableName: 'user_address',
        timestamps: true,
    }
);

UserAddressModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'addressData', });

// Export the model for use in other parts of the project
export { UserAddressModel };
