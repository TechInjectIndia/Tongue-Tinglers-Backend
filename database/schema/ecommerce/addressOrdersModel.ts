import { Model, DataTypes, Optional, } from 'sequelize';
import { sequelize } from "../../../config";
import { UserAddressAttributes } from "../../../interfaces";
import { UserModel } from '../user/user.model';

// Optional attributes for model creation
interface UserAddressCreationAttributes extends Optional<UserAddressAttributes, 'id' | 'billingGstin' | 'shippingGstin'> { }

// Define the UserAddress model class
class UserAddressModel extends Model<UserAddressAttributes, UserAddressCreationAttributes> implements UserAddressAttributes {
    public id!: string;
    public userId!: string;

    // Billing address properties
    public billingTitle!: string;
    public billingFirstName!: string;
    public billingLastName!: string;
    public billingEmail!: string;
    public billingPhone!: string;
    public billingGstin?: string;
    public billingAddress!: string;
    public billingCity!: string;
    public billingState!: string;
    public billingCountry!: string;
    public billingZipCode!: string;

    // Shipping address properties
    public shippingTitle!: string;
    public shippingFirstName!: string;
    public shippingLastName!: string;
    public shippingEmail!: string;
    public shippingPhone!: string;
    public shippingGstin?: string;
    public shippingAddress!: string;
    public shippingCity!: string;
    public shippingState!: string;
    public shippingCountry!: string;
    public shippingZipCode!: string;

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
        billingTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        billingFirstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        billingLastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        billingEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        billingPhone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        billingGstin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        billingAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        billingCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        billingState: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        billingCountry: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        billingZipCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // Shipping address fields
        shippingTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingFirstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingLastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        shippingPhone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingGstin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingState: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingCountry: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingZipCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // Your Sequelize instance
        tableName: 'user_address',
        timestamps: true,
    }
);

UserAddressModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'userData', });

// Export the model for use in other parts of the project
export { UserAddressModel };
