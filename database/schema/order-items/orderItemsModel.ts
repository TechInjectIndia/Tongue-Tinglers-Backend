import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { BaseOrderItem, ORDER_ITEM_TYPE, OrderItem } from "../../../interfaces/order_items";

interface OrderItemCreationAttributes extends Optional<OrderItem, | "id"> {
}

class OrderItemModel extends Model<OrderItem, OrderItemCreationAttributes> implements BaseOrderItem{
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
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    deletedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        field: "deleted_at",
    },
}, {
    sequelize,
    tableName: "order_items",
    timestamps: true,
    paranoid: true,
})

export {OrderItemModel}