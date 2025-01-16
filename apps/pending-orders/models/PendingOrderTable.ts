import { DataTypes, Model, Optional } from "sequelize";
import {
    Order,
    ORDER_TYPE
} from "apps/order/interface/Order";
import { Address } from "types";
import { sequelize } from "../../../config";

interface PendingOrderCreationAttributes extends Optional<Order, "id"> {}

class PendingOrderModel
    extends Model<Order, PendingOrderCreationAttributes>
    implements Order
{
    status!: string;
    item_count!: number;
    total!: number;
    anomalyArr!: number[];
    cancelled_items!: number[];
    customer_details!: number;
    delivery_details!: number;
    delivery_status!: string;
    payment_id!: string;
    payment_type!: string;
    total_discount!: number;
    total_shipping!: number;
    franchise_id: number;
    billingAddress: Address;
    shippingAddress: Address;
    total_tax!: number;
    prices!: string | null;
    discount_prices!: string | null;
    order_type: ORDER_TYPE;
    createdBy!: number | null;
    updatedBy!: number | null;
    deletedBy!: number | null;


    public static initModel() {
        PendingOrderModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                item_count: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                total: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                anomalyArr: {
                    type: DataTypes.ARRAY(DataTypes.INTEGER),
                    allowNull: true,
                },
                cancelled_items: {
                    type: DataTypes.ARRAY(DataTypes.INTEGER),
                    allowNull: true,
                },
                customer_details: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                delivery_details: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                delivery_status: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                franchise_id: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                billingAddress:{
                    type: DataTypes.JSONB,
                    allowNull: true,
                },
                shippingAddress:{
                    type: DataTypes.JSONB,
                    allowNull: true,
                },
                payment_id: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                payment_type: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                total_discount: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                total_shipping: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                total_tax: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                prices: {
                    type: DataTypes.JSONB,
                    allowNull: true,
                },
                discount_prices: {
                    type: DataTypes.JSONB,
                    allowNull: true,
                },
                order_type: {
                    type: DataTypes.ENUM(ORDER_TYPE.RM_ORDER, ORDER_TYPE.SAMPLE_KIT),
                    allowNull: false,
                    defaultValue: ORDER_TYPE.RM_ORDER
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
            },
            {
                sequelize,
                tableName: "pending_orders",
                timestamps: true,
            },
        );
        return PendingOrderModel;
    }
    createdAt: Date;
    deletedAt: Date | null;
    id: number;
    updatedAt: Date | null;
}

export { PendingOrderModel };
