import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TOrder, TOrderItem, OrderStatus } from "../../../types";
import { ORDER_TYPE, PAYMENT_STATUS } from '../../../interfaces';
const { INTEGER, STRING, JSONB, ENUM } = DataTypes;
import { OrderItemsModel } from './order_item.model'
import { UserModel } from '../user/user.model'

interface OrdersCreationAttributes extends Optional<TOrder, 'id' | 'createdAt' | 'updatedAt'> { }

class OrdersModel extends Model<TOrder, OrdersCreationAttributes> implements TOrder {
    public id!: number;
    public userId!: number;
    public trackingNumber!: string;
    public shippingAddresses!: any;
    public paymentMethod!: string;
    public paymentStatus!: string;
    public paymentId!: string;
    public totalPrice!: number;
    public orderStatus!: OrderStatus;
    public orderType!: ORDER_TYPE;

    public readonly items?: TOrderItem[]; // Array of items in the cart

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate(){
        OrdersModel.belongsTo(UserModel, { foreignKey: 'userId' });
        OrdersModel.hasMany(OrderItemsModel, { foreignKey: 'orderId', as: 'items' });
    }

    public static initModel(){

        OrdersModel.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            userId: {
                type: INTEGER,
                allowNull: true,
            },
            trackingNumber: {
                type: STRING,
            },
            shippingAddresses: {
                type: JSONB,
            },
            paymentMethod: {
                type: STRING,
            },
            paymentId: {
                type: STRING,
            },
            totalPrice: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0,
            },
            orderStatus: {
                type: ENUM,
                values: [...Object.values(OrderStatus)]
            },
            paymentStatus: {
                type: ENUM,
                values: [...Object.values(PAYMENT_STATUS)]
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
        return OrdersModel;
    }


}

export { OrdersModel };

