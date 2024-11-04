import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config';
import { AffiliateModel } from './affiliateModels';
import { SocialMediaDetailsAttributes, socialMediaEnumsPlatform } from "../../../interfaces";

// Define optional attributes for creation
interface SocialMediaDetailsCreationAttributes extends Optional<SocialMediaDetailsAttributes, 'id'> { }

// Define SocialMediaDetailsModel
class SocialMediaDetailsModel extends Model<SocialMediaDetailsAttributes, SocialMediaDetailsCreationAttributes>
    implements SocialMediaDetailsAttributes {
    public id!: string;
    public affiliateId!: string;
    public platform: socialMediaEnumsPlatform;
    public handle!: string;
    public followers!: number;
    public tags!: string[];

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model schema
SocialMediaDetailsModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        affiliateId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: AffiliateModel,
                key: 'id',
            },
        },
        platform: {
            type: DataTypes.ENUM(...Object.values(socialMediaEnumsPlatform)),
            allowNull: false,
        },
        handle: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        followers: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [],
        },
    },
    {
        sequelize,
        tableName: 'social_media_details',
        timestamps: true,
    }
);

export { SocialMediaDetailsModel };
