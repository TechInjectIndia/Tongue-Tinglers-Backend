import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { Affiliate } from "../../../interfaces";

const { UUID, STRING, JSONB, UUIDV4 } = DataTypes;

// Define the attributes for lead creation
interface AffiliateCreationAttributes extends Optional<Affiliate, 'id'> { }

// Define the model class for AffiliateModel
class AffiliateModel extends Model<Affiliate, AffiliateCreationAttributes> implements Affiliate {
    public id!: number;
    public type!: string;
    public codes!: Record<string, string>;

}

// Initialize the AffiliateModel
AffiliateModel.init({
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
}, {
    sequelize,
    tableName: 'affiliate_models',
    timestamps: true,
});

// Export the model
export { AffiliateModel };
