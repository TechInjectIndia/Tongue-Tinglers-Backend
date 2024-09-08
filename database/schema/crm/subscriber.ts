import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TSubscriber } from "../../../types";
const { INTEGER, STRING } = DataTypes;

interface UserCreationAttributes extends Optional<TSubscriber, 'id' | 'createdAt' | 'updatedAt'> { }

class SubscriberModel extends Model<TSubscriber, UserCreationAttributes> implements TSubscriber {
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
        field: "scheduled_at",
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
    tableName: 'subscribers',
    timestamps: true
});

export { SubscriberModel };
