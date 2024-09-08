import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TCampaign, CAMPAIGN_STATUS } from "../../../types";
const { INTEGER, STRING, ENUM, TEXT } = DataTypes;

interface UserCreationAttributes extends Optional<TCampaign, 'id' | 'createdAt' | 'updatedAt'> { }

class CampaignModel extends Model<TCampaign, UserCreationAttributes> implements TCampaign {
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
        field: "scheduled_at",
    },
    sentAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "sent_at",
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
    },
}, {
    sequelize,
    tableName: 'email_campaign',
    timestamps: true
});

export { CampaignModel };
