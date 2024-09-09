import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TEmail } from "../../../types";
import { EMAIL_STATUS } from "../../../interfaces";
const { INTEGER, DATE, ENUM, NOW } = DataTypes;
import { CampaignModel } from './campaign';
import { SubscriberModel } from './subscriber';

interface EmailCreationAttributes extends Optional<TEmail, 'id' | 'createdAt' | 'updatedAt'> { }

class EmailModel extends Model<TEmail, EmailCreationAttributes> implements TEmail {
    public id!: number;
    public campaignId!: number;
    public subscriberId!: number;
    public status!: string;
    public readonly sentAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

EmailModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    campaignId: {
        type: INTEGER,
        references: {
            model: CampaignModel,
            key: 'id',
        },
        allowNull: false,
    },
    subscriberId: {
        type: INTEGER,
        references: {
            model: SubscriberModel,
            key: 'id',
        },
        allowNull: false,
    },
    status: {
        type: ENUM,
        defaultValue: EMAIL_STATUS.DRAFT,
        values: [...Object.values(EMAIL_STATUS)]
    },
    sentAt: {
        type: DATE,
        allowNull: true,
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
    },
}, {
    sequelize,
    tableName: 'emails',
    timestamps: true
});

CampaignModel.hasMany(EmailModel, { foreignKey: 'campaignId' });
EmailModel.belongsTo(CampaignModel, { foreignKey: 'campaignId' });

SubscriberModel.hasMany(EmailModel, { foreignKey: 'subscriberId' });
EmailModel.belongsTo(SubscriberModel, { foreignKey: 'subscriberId' });

export { EmailModel };
