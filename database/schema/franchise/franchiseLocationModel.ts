import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { FranchiseLocationAttributes } from '../../../interfaces';
import { FranchiseeModel } from "./franchiseeModel";

// Define the attributes for the FranchiseLocation
interface FranchiseLocationCreationAttributes extends Optional<FranchiseLocationAttributes, 'id'> { }

// FranchiseLocation model definition
class FranchiseLocationModel extends Model<FranchiseLocationAttributes, FranchiseLocationCreationAttributes> implements FranchiseLocationAttributes {
    public id!: number;
    public franchiseeId!: number;
    public contactPhone!: string;
    public location!: string;
    public city!: string;
    public state!: string;
    public country!: string;
    public zipCode!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

// Initialize the FranchiseLocationModel
FranchiseLocationModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true, 
        },
        franchiseeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: FranchiseeModel,
                key: 'id',
            },
        },
        contactPhone: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "Contact phone number for this franchise location",
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "Specific location or address of the franchise",
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "City where the franchise location is situated",
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "State or region for the franchise location",
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "Country of the franchise location",
        },
        zipCode: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "Zip code or postal code for the franchise location",
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'franchise_locations',
        timestamps: true,
    }
);

export { FranchiseLocationModel };
