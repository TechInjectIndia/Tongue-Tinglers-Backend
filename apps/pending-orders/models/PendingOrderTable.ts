import {DataTypes, Model, Optional} from "sequelize";
import {
    DeliveryStatus,
    Notes,
    ORDER_TYPE,
    OrderStatus,
    PAYMENT_TYPE
} from "apps/order/interface/Order";
import { Address } from "types";
import { sequelize } from "../../../config";
import { UserModel } from "apps/user/models/UserTable";
import { FranchiseModel } from "apps/franchise/models/FranchiseTable";
import { PendingOrderTable } from "../interface/PendingOrder";
import { OrderItemPayload } from "apps/order-items/interface/orderItem";
import { PendingOrderItemModel } from "./PendingOrderItemTable";

interface PendingOrderCreationAttributes extends Optional<PendingOrderTable, "id"> {}

class PendingOrderModel
    extends Model<PendingOrderTable, PendingOrderCreationAttributes>
    implements PendingOrderTable
{
    id:number;
    status: OrderStatus;
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
    franchise: number;
    billingAddress: Address;
    shippingAddress: Address;
    total_tax!: number;
    prices!: string | null;
    discount_prices!: string | null;
    order_type: ORDER_TYPE;
    notes: Notes[];
    items: OrderItemPayload[];
    totalTax: number;
    deliveryStatus: DeliveryStatus;
    customerDetails: number;
    paymentType: PAYMENT_TYPE;
    paymentId: string;
    cancelledItems: number[];
    totalDiscount: number;
    deliveryDetails: any;
    totalShipping: number;
    price: Record<string, string | number>;
    orderType: ORDER_TYPE;
    createdBy!: number | null;
    updatedBy!: number | null;
    deletedBy!: number | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    public static associate(){
        PendingOrderModel.belongsTo(UserModel, {
            foreignKey: 'customerDetails',
            as: 'customer'
        })

        PendingOrderModel.hasMany(PendingOrderItemModel, {
            foreignKey: 'orderId', 
            as: 'orderItems' 
        });

        PendingOrderModel.belongsTo(FranchiseModel, {
            foreignKey: 'franchise',
            as: 'franchiseData'
        })

        PendingOrderModel.belongsTo(UserModel, {
            foreignKey: 'createdBy',
            as: 'createdByUser'
        })
        PendingOrderModel.belongsTo(UserModel, {
            foreignKey: 'updatedBy',
            as: 'updatedByUser'
        })
        PendingOrderModel.belongsTo(UserModel, {
            foreignKey: 'deletedBy',
            as: 'deletedByUser'
        })
    }

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
                total: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                anomalyArr: {
                    type: DataTypes.ARRAY(DataTypes.INTEGER),
                    allowNull: true,
                },
                cancelledItems: {
                    type: DataTypes.ARRAY(DataTypes.INTEGER),
                    allowNull: true,
                },
                customerDetails: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                deliveryDetails: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                deliveryStatus: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                franchise: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                billingAddress: {
                    type: DataTypes.JSONB,
                    allowNull: true,
                },
                shippingAddress: {
                    type: DataTypes.JSONB,
                    allowNull: true,
                },
                paymentId: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                paymentType: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                totalDiscount: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                totalShipping: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                totalTax: {
                    type: DataTypes.DOUBLE,
                    allowNull: true,
                },
                price: {
                    type: DataTypes.JSONB,
                    allowNull: true,
                },
                orderType: {
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
                notes: {
                    type: DataTypes.JSONB,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "pending-order",
                timestamps: true,
                underscored: true,
                createdAt: "created_at",
                updatedAt: "updated_at",
                deletedAt: "deleted_at",
            }
        );
        return PendingOrderModel;
    }
}

export { PendingOrderModel };
