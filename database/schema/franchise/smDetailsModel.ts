import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config';
import { SocialMediaDetailsAttributesFranchisee, SM_PLATFORM_FRANCHISE } from "../../../interfaces";
import { FranchiseeModel } from "./franchiseeModel";

// Define optional attributes for creation
interface SocialMediaDetailsCreationAttributes extends Optional<SocialMediaDetailsAttributesFranchisee, 'id'> { }

// Define SocialMediaDetailsFranchiseModel
class SocialMediaDetailsFranchiseModel extends Model<SocialMediaDetailsAttributesFranchisee, SocialMediaDetailsCreationAttributes>
    implements SocialMediaDetailsAttributesFranchisee {
    public id!: number;
    public franchiseeId!: number;
    public url: string;
    public type: SM_PLATFORM_FRANCHISE;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model schema
SocialMediaDetailsFranchiseModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        franchiseeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: FranchiseeModel,
                key: 'id',
            },
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM(...Object.values(SM_PLATFORM_FRANCHISE)),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'franchise_sm',
        timestamps: true,
    }
);

export { SocialMediaDetailsFranchiseModel };
