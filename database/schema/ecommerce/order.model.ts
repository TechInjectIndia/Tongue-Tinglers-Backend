import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TOrder } from "../../../types";
import { ORDER_TYPE, ORDER_STATUS } from '../../../interfaces';
const { INTEGER, STRING, TEXT, ENUM, BOOLEAN } = DataTypes;
import { OrderItemsModel } from './order_item.model'
import { UserModel } from '../user/user.model'

interface OrdersCreationAttributes extends Optional<TOrder, 'id' | 'createdAt' | 'updatedAt'> { }

class OrdersModel extends Model<TOrder, OrdersCreationAttributes> implements TOrder {
    public id!: string;
    public userId!: string;
    public trackingNumber!: string;
    public shippingAddress!: string;
    public paymentMethod!: string;
    public totalPrice!: number;
    public orderStatus!: string;
    public orderType!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

OrdersModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: STRING,
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
        values: [...Object.values(ORDER_STATUS)]
    },
    orderType: {
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

OrdersModel.hasMany(OrderItemsModel, { as: 'order_items' });
OrdersModel.belongsTo(UserModel, { foreignKey: 'userId' });

export { OrdersModel };

