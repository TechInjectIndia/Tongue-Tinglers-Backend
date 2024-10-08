import { DataTypes, Model, Optional } from "sequelize";
import { SMDetails } from '../../../interfaces';
import { sequelize } from "../../../config";
import { Affiliate } from "../../../interfaces";

const { STRING, DATE, JSONB, NOW, UUIDV4 } = DataTypes;

// Define the attributes for lead creation
interface AffiliateCreationAttributes extends Optional<Affiliate, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }

// Define the model class for AffiliateModel
class AffiliateModel extends Model<Affiliate, AffiliateCreationAttributes> implements Affiliate {
    public id!: string;
    public type!: Affiliate;
    public codes!: Record<string, string>;
    public sm!: Record<string, SMDetails>;
    public createdBy!: string;
    public updatedBy!: string | null;
    public deletedBy!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;
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
    createdBy: {
        type: STRING,
        allowNull: false,
    },
    updatedBy: {
        type: STRING,
        allowNull: true,
    },
    deletedBy: {
        type: STRING,
        allowNull: true,
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        field: "created_at",
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        field: "updated_at",
    },
    deletedAt: {
        type: DATE,
        allowNull: true,
        defaultValue: null,
        field: "deleted_at",
    },
}, {
    sequelize,
    tableName: 'affiliate_models',
    timestamps: true,
    paranoid: true, // enables soft deletion (paranoid mode)
});

// Export the model
export { AffiliateModel };
