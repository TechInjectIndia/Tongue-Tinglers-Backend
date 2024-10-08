import { DataTypes, Model, Optional } from "sequelize";
import { SeoImage, ProposalModels } from '../../../interfaces';
import { sequelize } from "../../../config";

const { STRING, TEXT, DATE, JSONB, UUIDV4 } = DataTypes;

// Define the attributes for lead creation
interface LeadCreationAttributes extends Optional<ProposalModels, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy' | 'deletedAt' | 'deletedBy'> { }

// Define the model class for ProposalModels
class ProposalLeadModels extends Model<ProposalModels, LeadCreationAttributes> implements ProposalModels {
    public id!: string;
    public title!: string;
    public createdAt!: Date;
    public createdBy!: string;
    public updatedAt!: Date | null;
    public updatedBy!: string | null;
    public deletedAt!: Date | null;
    public deletedBy!: string | null;
    public budget!: number;
    public files!: SeoImage[];
}

// Initialize the Proposal model
ProposalLeadModels.init({
    id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
    },
    title: {
        type: STRING,
        allowNull: false,
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    createdBy: {
        type: STRING,
        allowNull: false,
    },
    updatedAt: {
        type: DATE,
        allowNull: true,
    },
    updatedBy: {
        type: STRING,
        allowNull: true,
    },
    deletedAt: {
        type: DATE,
        allowNull: true,
    },
    deletedBy: {
        type: STRING,
        allowNull: true,
    },
    budget: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    files: {
        type: JSONB,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'Proposal_model',
    timestamps: false, // Disable automatic timestamp management since we're defining our own
});

// Export the model
export { ProposalLeadModels };
