import { DataTypes, Model, Optional } from "sequelize";
import { SocialMediaDetails, socialMediaEnumsPlatform } from "../../lead/interface/lead";
import { sequelize } from "config";


// Define optional attributes for creation
interface SocialMediaDetailsCreationAttributes extends Optional<SocialMediaDetails, "id"> {
}

// Define SocialMediaDetailsModel
class SocialMediaDetailsModel extends Model<SocialMediaDetails, SocialMediaDetailsCreationAttributes>
    implements SocialMediaDetails {
    public id!: number;
    public platform: socialMediaEnumsPlatform;
    public handle!: string;
    public followers!: number;
    public tags!: string[];
    public affiliateId: number;
}

// Initialize the model schema
SocialMediaDetailsModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
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
        affiliateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "social_media_details",
        timestamps: true,
    },
);

export { SocialMediaDetailsModel };
