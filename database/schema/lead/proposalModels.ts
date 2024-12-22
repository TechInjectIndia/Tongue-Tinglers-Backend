import { DataTypes, Model, Optional } from "sequelize";
import { SeoImage, ProposalModels } from "../../../interfaces";
import { sequelize } from "../../../config";
import { INTEGER } from "sequelize";

const { STRING, TEXT, DATE, JSONB, UUIDV4 } = DataTypes;

// Define the attributes for lead creation
interface LeadCreationAttributes
    extends Optional<
        ProposalModels,
        | "id"
        | "createdAt"
        | "createdBy"
        | "updatedAt"
        | "updatedBy"
        | "deletedAt"
        | "deletedBy"
    > {}

// Define the model class for ProposalModels
class ProposalLeadModels
    extends Model<ProposalModels, LeadCreationAttributes>
    implements ProposalModels
{
    public id!: number;
    public franchiseModel!: number;
    public title!: string;
    /* comma separated string */
    public prices!: string;
    public createdAt!: Date;
    public createdBy!: number;
    public updatedAt!: Date | null;
    public updatedBy!: number | null;
    public deletedAt!: Date | null;
    public deletedBy!: number | null;
}

// Initialize the Proposal model

ProposalLeadModels.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true, 
        },
        title: {
            type: STRING,
            allowNull: false,
        },
        prices: {
            type: STRING,
            allowNull: false,
        },
        franchiseModel: {
            type: INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        createdBy: {
            type: INTEGER,
            allowNull: false,
        },
        updatedAt: {
            type: DATE,
            allowNull: true,
        },
        updatedBy: {
            type: INTEGER,
            allowNull: true,
        },
        deletedAt: {
            type: DATE,
            allowNull: true,
        },
        deletedBy: {
            type: INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "proposal_model",
        timestamps: false, // Disable automatic timestamp management since we're defining our own
    }
);

// Export the model
export { ProposalLeadModels };
