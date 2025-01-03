import { DataTypes, Model, Optional } from "sequelize";

import { INTEGER } from "sequelize";
import { ProposalTable } from "../interface/proposal";
import { sequelize } from "config";
import {CampaignAdModel} from "apps/campaign/models/CampaignModel";
import {
    CampaignProposalsModel
} from "apps/campaign/models/CampaignProposalsModel";


const { STRING, TEXT, DATE, JSONB, UUIDV4 } = DataTypes;

interface ProposalCreationAttributes
    extends Optional<
        ProposalTable,
        "id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "deletedAt" | "deletedBy"
    > { }

class ProposalModel extends Model<ProposalTable, ProposalCreationAttributes>
    implements ProposalTable {
    public id!: number;
    public franchiseModel!: number; // One-to-Many: FranchiseModel ID
    public title!: string;
    public prices!: string; // Comma-separated prices
    public createdAt!: Date;
    public createdBy!: number;
    public updatedAt!: Date | null;
    public updatedBy!: number | null;
    public deletedAt!: Date | null;
    public deletedBy!: number | null;

    public static initModel() {

// Initialize the Proposal model

        ProposalModel.init(
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
        return ProposalModel;
    }
    public static associate() {
        // Many-to-Many association with CampaignAdModel
        ProposalModel.belongsToMany(CampaignAdModel, {
            through: CampaignProposalsModel, // Junction table
            foreignKey: "proposalId",
            otherKey: "campaignId",
            as: "campaigns",
        });
    }
}

// Export the model
export { ProposalModel };
