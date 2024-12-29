import { BaseOrderItem, ORDER_ITEM_TYPE } from "apps/order/interface/OrderItem";
import { sequelize } from "config";
import { OrderItem } from "interfaces/order_items";
import { DataTypes, Model, Optional } from "sequelize";

interface OrderItemCreationAttributes extends Optional<OrderItem, | "id"> {
}

class OrderItemModel extends Model<OrderItem, OrderItemCreationAttributes> implements BaseOrderItem {
    id: number;
    product_id: number;
    product_option_id: number;
    quantity: number;
    total_price: number;
    total_tax: number;
    coupon_discount: number;
    points_discount: number;
    student_discount: number;
    type: ORDER_ITEM_TYPE;
}

OrderItemModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_option_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_tax: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    coupon_discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    points_discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    student_discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM(...Object.values(ORDER_ITEM_TYPE)),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "order_items",
    timestamps: true,
    paranoid: true,
})

export { OrderItemModel }