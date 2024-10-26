import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { UserModel } from '../user/user.model';
import { questionModel } from './questionModel';
import { ICampaign } from '../../../interfaces';

const { STRING, DATE, NOW, UUIDV4, JSONB } = DataTypes;

interface CampaignCreationAttributes extends Optional<ICampaign, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }

class CampaignAdModel extends Model<ICampaign, CampaignCreationAttributes> implements ICampaign {
    public id!: string;
    public name!: string;
    public franchiseId?: string;
    public description?: string;
    public questionList!: string[];

    public createdBy!: string;
    public updatedBy!: string | null;
    public deletedBy!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;
}

CampaignAdModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
        comment: 'Unique identifier for the campaign',
    },
    franchiseId: {
        type: STRING,
        allowNull: true,
    },
    name: {
        type: STRING,
        allowNull: false,
        comment: 'Name of the campaign',
    },
    description: {
        type: STRING,
        allowNull: true,
        comment: 'Description of the campaign',
    },
    questionList: {
        type: JSONB,
        allowNull: false,
        comment: 'List of questions associated with the campaign',
    },
    createdBy: {
        type: STRING,
        allowNull: false,
        comment: 'User who created the campaign',
    },
    updatedBy: {
        type: STRING,
        allowNull: true,
        comment: 'User who last updated the campaign',
    },
    deletedBy: {
        type: STRING,
        allowNull: true,
        comment: 'User who deleted the campaign (if soft deleted)',
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        comment: 'Timestamp when the campaign was created',
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        comment: 'Timestamp when the campaign was last updated',
    },
    deletedAt: {
        type: DATE,
        allowNull: true,
        comment: 'Timestamp when the campaign was deleted (if soft deleted)',
    },
}, {
    sequelize,
    tableName: 'campaigns',
    timestamps: true,
    paranoid: true,
    comment: 'Table to store campaigns',
});

export { CampaignAdModel };
