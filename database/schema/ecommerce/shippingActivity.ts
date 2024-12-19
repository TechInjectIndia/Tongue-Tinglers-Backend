import {DataTypes, INTEGER, Model, Optional} from "sequelize";
import {sequelize} from "../../../config";
import {IShippingActivity, IShippingHistory} from "../../../interfaces";
import {OrdersModel} from './order.model';
import {UserModel} from "../user/user.model";
import {OrderItemsModel} from "./order_item.model";

const {STRING, JSONB, DATE} = DataTypes;

interface ShippingHistoryCreationAttributes
    extends Optional<IShippingHistory, 'id' | 'createdAt' | 'updatedAt'> {
}

class ShippingHistoryModel
    extends Model<IShippingHistory, ShippingHistoryCreationAttributes>
    implements IShippingHistory {
    public id!: number;
    public orderId!: number;
    public date?: string;
    public activities!: IShippingActivity[];
    public trackingNumber!: string | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public static associate() {
        OrdersModel.belongsTo(UserModel, {foreignKey: 'userId'});
        // OrdersModel.hasMany(OrderItemsModel, {foreignKey: 'orderId', as: 'items'});
    }

    public static initModel() {
        ShippingHistoryModel.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            orderId: {
                type: INTEGER,
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
        return ShippingHistoryModel;
    }
}


export {ShippingHistoryModel};
