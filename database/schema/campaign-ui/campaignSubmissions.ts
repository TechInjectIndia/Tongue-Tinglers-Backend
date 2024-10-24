import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { CampaignAdModel } from './campaignAdModel';
import { ICampaignSubmisisons } from '../../../interfaces';

const { TEXT, DATE, NOW, UUIDV4 } = DataTypes;

interface AnswerCreationAttributes extends Optional<ICampaignSubmisisons, 'id' | 'createdAt' | 'updatedAt'> { }

class CampaignSubmissions extends Model<ICampaignSubmisisons, AnswerCreationAttributes> implements ICampaignSubmisisons {
    public id!: string;
    public campaignId!: string;
    public response!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
        CampaignSubmissions.belongsTo(CampaignAdModel, {
            foreignKey: 'campaignId',
            as: 'campaign',
        });
    }
}

CampaignSubmissions.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
        comment: 'Unique identifier for the answer',
    },
    campaignId: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: 'The campaign this answer is associated with',
    },
    response: {
        type: TEXT,
        allowNull: false,
        comment: 'The actual answer provided by the user',
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        comment: 'Timestamp when the answer was created',
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        comment: 'Timestamp when the answer was last updated',
    },
}, {
    sequelize,
    tableName: 'campaign_submissions',
    timestamps: true,
    comment: 'Table to store answers for campaigns',
});

CampaignSubmissions.associate();

export { CampaignSubmissions };
