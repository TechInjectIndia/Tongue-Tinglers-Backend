import { DataTypes, Model, Optional } from "sequelize";
import { Affiliate } from "../interface/affiliate";
import { UserModel } from "apps/user/models/UserTable";
import { SocialMediaDetailsModel } from "apps/lead/models/smDetailsTable";
import { sequelize } from "config";


const { UUID, STRING, JSONB, UUIDV4, INTEGER } = DataTypes;

// Define the attributes for lead creation
interface AffiliateCreationAttributes extends Optional<Affiliate, "id"> {}

// Define the model class for AffiliateModel
class AffiliateModel
    extends Model<Affiliate, AffiliateCreationAttributes>
    implements Affiliate
{
    public id!: number;
    public type!: string;
    public codes!: Record<string, string>;
    public userId: number;

    public static associate() {
        AffiliateModel.belongsTo(UserModel, {
            foreignKey: "userId",
            as: "user",
        });
        AffiliateModel.hasMany(SocialMediaDetailsModel, {
            as: "sm",
            foreignKey: "affiliateId",
        });
    }

    public static initModel() {
        // Initialize the AffiliateModel
        AffiliateModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                type: {
                    type: STRING,
                    allowNull: false,
                },
                codes: {
                    type: JSONB,
                    allowNull: false,
                },
                userId: {
                    type: INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "affiliate_models",
                timestamps: true,
            }
        );
        return AffiliateModel
    }
}

// Export the model
export { AffiliateModel };
