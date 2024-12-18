import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { CampaignAdModel } from './campaignAdModel';
import { ICampaignSubmisisons } from '../../../interfaces';

const { TEXT, DATE, INTEGER, NOW, UUIDV4 } = DataTypes;

interface AnswerCreationAttributes extends Optional<ICampaignSubmisisons, 'id' | 'createdAt' | 'updatedAt'> { }

class CampaignSubmissions extends Model<ICampaignSubmisisons, AnswerCreationAttributes> implements ICampaignSubmisisons {
    public id!: number;
    public campaignId!: number;
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
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, 
    },
    campaignId: {
        type: INTEGER,
        allowNull: false,
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
