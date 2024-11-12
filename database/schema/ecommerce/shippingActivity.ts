import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { IShippingHistory, IShippingActivity } from "../../../interfaces";
import { OrdersModel } from '../ecommerce/order.model';

const { STRING, JSONB, UUIDV4, DATE } = DataTypes;

interface ShippingHistoryCreationAttributes extends Optional<IShippingHistory, 'id' | 'createdAt' | 'updatedAt'> { }

class ShippingHistoryModel extends Model<IShippingHistory, ShippingHistoryCreationAttributes> implements IShippingHistory {
    public id!: string;
    public orderId!: string;
    public date?: string;
    public activities!: IShippingActivity[];
    public trackingNumber!: string | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ShippingHistoryModel.init({
    id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
    },
    orderId: {
        type: STRING,
        allowNull: false,
    },
    date: {
        type: STRING,
        allowNull: true,
    },
    trackingNumber: {
        type: STRING,
        allowNull: true,
    },
    activities: {
        type: JSONB,
        allowNull: false,
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'shipping_history',
    timestamps: true,
});

OrdersModel.hasMany(ShippingHistoryModel, { foreignKey: 'orderId' });
ShippingHistoryModel.belongsTo(OrdersModel, { foreignKey: 'orderId' });

export { ShippingHistoryModel };
