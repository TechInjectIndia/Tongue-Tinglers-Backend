import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TEmail, EMAIL_STATUS } from "../../../types";
const { INTEGER, STRING, ENUM } = DataTypes;
import {CampaignModel} from './campaign';
import {SubscriberModel} from './subscriber';

interface UserCreationAttributes extends Optional<TEmail, 'id' | 'createdAt' | 'updatedAt'> { }

class EmailModel extends Model<TEmail, UserCreationAttributes> implements TEmail {
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
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    campaignId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Campaigns',
            key: 'id',
        },
        allowNull: false,
    },
    subscriberId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Subscribers',
            key: 'id',
        },
        allowNull: false,
    },
    status: {
        type: ENUM,
        values: [...Object.values(EMAIL_STATUS)]
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
    tableName: 'emails',
    timestamps: true
});

CampaignModel.hasMany(EmailModel, { foreignKey: 'campaignId' });
EmailModel.belongsTo(CampaignModel, { foreignKey: 'campaignId' });

SubscriberModel.hasMany(EmailModel, { foreignKey: 'subscriberId' });
EmailModel.belongsTo(SubscriberModel, { foreignKey: 'subscriberId' });

export { EmailModel };
