import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { TOrder } from "../../../types";
import { ORDER_TYPE } from '../../../interfaces';
const { INTEGER, STRING, TEXT, ENUM, BOOLEAN } = DataTypes;
import { RetortOrderItemsModel } from './retort-order_item'
import { UserModel } from '../user/user.model'

interface RetortOrdersCreationAttributes extends Optional<TOrder, 'id' | 'createdAt' | 'updatedAt'> { }

class RetortOrdersModel extends Model<TOrder, RetortOrdersCreationAttributes> implements TOrder {
    public id!: number;
    public userId!: string;
    public trackingNumber!: string;
    public shippingAddress!: string;
    public paymentMethod!: string;
    public totalPrice!: number;
    public orderStatus!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RetortOrdersModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
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
    tableName: 'retort_orders',
    timestamps: true,
});

RetortOrdersModel.hasMany(RetortOrderItemsModel,  { as: 'order_items' });
RetortOrdersModel.belongsTo(UserModel, { foreignKey: 'userId' });

export { RetortOrdersModel };

