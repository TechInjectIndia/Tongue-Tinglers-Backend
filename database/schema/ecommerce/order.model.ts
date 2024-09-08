import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TOrder } from "../../../types";
import { ORDER_TYPE } from '../../../interfaces';
const { INTEGER, STRING, TEXT, ENUM, BOOLEAN } = DataTypes;
import { OrderItemsModel } from './order_item.model'
import { UserModel } from '../user/user.model'

interface OrdersCreationAttributes extends Optional<TOrder, 'id' | 'createdAt' | 'updatedAt'> { }

class OrdersModel extends Model<TOrder, OrdersCreationAttributes> implements TOrder {
    public id!: number;
    public userId!: number;
    public trackingNumber!: string;
    public shippingAddress!: string;
    public paymentMethod!: string;
    public totalPrice!: number;
    public orderStatus!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

OrdersModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: INTEGER,
        allowNull: true,
    },
    trackingNumber: {
        type: STRING,
    },
    shippingAddress: {
        type: STRING,
    },
    paymentMethod: {
        type: STRING,
    },
    totalPrice: {
        type: INTEGER,
    },
    orderStatus: {
        type: ENUM,
        values: [...Object.values(ORDER_TYPE)]
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
    tableName: 'orders',
    timestamps: true,
});

OrdersModel.hasMany(OrderItemsModel,  { as: 'order_items' });
OrdersModel.belongsTo(UserModel, { foreignKey: 'userId' });

export { OrdersModel };

