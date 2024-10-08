import { DataTypes, Model, Optional } from "sequelize";
import { SMDetails } from '../../../interfaces';
import { sequelize } from "../../../config";
import { Affiliate } from "../../../interfaces";

const { STRING, DATE, JSONB, NOW, UUIDV4 } = DataTypes;

// Define the attributes for lead creation
interface AffiliateCreationAttributes extends Optional<Affiliate, 'id'> { }

// Define the model class for AffiliateModel
class AffiliateModel extends Model<Affiliate, AffiliateCreationAttributes> implements Affiliate {
    public id!: string;
    public type!: string;
    public codes!: Record<string, string>;
    public sm!: Record<string, SMDetails>;
}

// Initialize the AffiliateModel
AffiliateModel.init({
    id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
    },
    type: {
        type: STRING,
        allowNull: false,
    },
    codes: {
        type: JSONB,
        allowNull: false,
    },
    sm: {
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
