import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TSubscriber } from "../../../types";
const { INTEGER, STRING } = DataTypes;

interface SubscriberCreationAttributes extends Optional<TSubscriber, 'id' | 'createdAt' | 'updatedAt'> { }

class SubscriberModel extends Model<TSubscriber, SubscriberCreationAttributes> implements TSubscriber {
    public id!: number;
    public name!: string;
    public email: string;
    public readonly subscribedAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

SubscriberModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: STRING
    },
    email: {
        type: STRING
    },
    subscribedAt: {
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
    tableName: 'subscribers',
    timestamps: true
});

export { SubscriberModel };
