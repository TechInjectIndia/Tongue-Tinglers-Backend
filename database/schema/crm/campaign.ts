import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { CAMPAIGN_STATUS } from '../../../interfaces';
import { TCampaign } from "../../../types";
const { INTEGER, STRING, ENUM, TEXT } = DataTypes;

interface campaignAttributes extends Optional<TCampaign, 'id' | 'createdAt' | 'updatedAt'> { }

class CampaignModel extends Model<TCampaign, campaignAttributes> implements TCampaign {
    public id!: number;
    public name!: string;
    public subject: string;
    public body: string;
    public status!: string; // 'draft', 'sent', 'archived'
    public readonly scheduledAt!: Date;
    public readonly sentAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CampaignModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: STRING
    },
    subject: {
        type: STRING
    },
    body: {
        type: TEXT,
    },
    status: {
        type: ENUM,
        values: [...Object.values(CAMPAIGN_STATUS)]
    },
    scheduledAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    sentAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'email_campaign',
    timestamps: true
});

export { CampaignModel };
