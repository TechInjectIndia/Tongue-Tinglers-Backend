import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { UserModel } from "../user/user.model";
import { questionModel } from "./questionModel";
import { ICampaign } from "../../../interfaces";
import { RegionModel } from "../franchise/RegionsModel";
import { AffiliateModel } from "../lead/affiliateModels";

const { STRING, INTEGER, DATE, NOW, UUIDV4, JSONB, UUID } = DataTypes;

interface CampaignCreationAttributes
    extends Optional<
        ICampaign,
        "id" | "createdAt" | "updatedAt" | "deletedAt"
    > {}

class CampaignAdModel
    extends Model<ICampaign, CampaignCreationAttributes>
    implements ICampaign
{
    public id!: number;
    public name!: string;
    public franchiseId?: string;
    public regionId: number;
    public description?: string;
    public questionList!: string[];
    public affiliateId: string;
    public proposalIds!: string[];
    public start!: Date;
    public to!: Date;

    public createdBy!: string;
    public updatedBy!: string | null;
    public deletedBy!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;
}

CampaignAdModel.init(
    {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        franchiseId: {
            type: STRING,
            allowNull: true,
        },
        regionId: {
            type: STRING,
            references: {
                model: RegionModel,
                key: "id",
            },
            allowNull: true,
        }, // Update region to regionId
        name: {
            type: STRING,
            allowNull: false,
            comment: "Name of the campaign",
        },
        description: {
            type: STRING,
            allowNull: true,
            comment: "Description of the campaign",
        },
        questionList: {
            type: JSONB,
            allowNull: false,
            comment: "List of questions associated with the campaign",
        },
        affiliateId: {
            type: STRING,
            allowNull: true,
        },
        proposalIds: {
            type: JSONB,
            allowNull: true,
            comment: "List of proposal model associated with the campaign",
        }, // New field added
        start: {
            type: DATE,
            allowNull: true,
            comment: "Timestamp when the campaign was start",
        },
        to: {
            type: DATE,
            allowNull: true,
            comment: "Timestamp when the campaign was start",
        },
        createdBy: {
            type: STRING,
            allowNull: false,
            comment: "User who created the campaign",
        },
        updatedBy: {
            type: STRING,
            allowNull: true,
            comment: "User who last updated the campaign",
        },
        deletedBy: {
            type: STRING,
            allowNull: true,
            comment: "User who deleted the campaign (if soft deleted)",
        },
        createdAt: {
            type: DATE,
            allowNull: false,
            defaultValue: NOW,
            comment: "Timestamp when the campaign was created",
        },
        updatedAt: {
            type: DATE,
            allowNull: false,
            defaultValue: NOW,
            comment: "Timestamp when the campaign was last updated",
        },
        deletedAt: {
            type: DATE,
            allowNull: true,
            comment:
                "Timestamp when the campaign was deleted (if soft deleted)",
        },
    },
    {
        sequelize,
        tableName: "campaigns",
        timestamps: true,
        paranoid: true,
        comment: "Table to store campaigns",
    }
);

export { CampaignAdModel };
