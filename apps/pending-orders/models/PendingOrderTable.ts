import { DataTypes, Model, Optional } from "sequelize";
import { PendingOrder, PendingOrderPayload } from "../interface/PendingOrder";
import { OrderStatus, PAYMENT_TYPE } from "apps/order/interface/Order";
import { ParsedUser } from "apps/user/interface/user";
import {
    IDiscComponent,
    ParsedOrderItem,
    PriceComponent,
} from "apps/order/interface/OrderItem";
import { Address } from "types";
import { sequelize } from "../../../config";

interface PendingOrderCreationAttributes extends Optional<PendingOrder, "id"> {}

class PendingOrderModel
    extends Model<PendingOrder, PendingOrderCreationAttributes>
    implements PendingOrderPayload
{
    orderId: number;
    status: OrderStatus;
    total: number; // without Tax
    totalTax: number;
    deliveryStatus: string;
    customerDetails: ParsedUser;
    paymentType: PAYMENT_TYPE; //todo convert to enum
    paymentId: number;
    paymentOrderId: string;
    cancelledItems: ParsedOrderItem[];
    discount: Record<string, IDiscComponent>;
    totalDiscount: number;
    deliveryDetails: any; //todo @nitesh convert to interface
    shippingAddress: Address;
    totalShipping: number;
    anomalyArr: number[];
    coupon: string | null;
    items: ParsedOrderItem[];
    price: Record<string, PriceComponent>;
    couponCodes: string[];

    public static initModel() {
        PendingOrderModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                orderId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.ENUM(...Object.values(OrderStatus)), // Assuming OrderStatus is an enum
                    allowNull: false,
                },
                total: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                totalTax: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                deliveryStatus: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                customerDetails: {
                    type: DataTypes.JSON, // Store complex objects as JSON
                    allowNull: false,
                },
                paymentType: {
                    type: DataTypes.ENUM(...Object.values(PAYMENT_TYPE)), // Assuming PAYMENT_TYPE is an enum
                    allowNull: false,
                },
                paymentId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                paymentOrderId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                cancelledItems: {
                    type: DataTypes.JSON, // Store array of objects as JSON
                    allowNull: false,
                },
                discount: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },
                totalDiscount: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                deliveryDetails: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
                shippingAddress: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
                totalShipping: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                anomalyArr: {
                    type: DataTypes.JSON,
                    allowNull: true, // Array of numbers
                },
                coupon: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                items: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },
                price: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },
                couponCodes: {
                    type: DataTypes.JSON,
                    allowNull: true, // Array of strings
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
                timestamps: true, // Add `createdAt` and `updatedAt`
            },
        );
        return PendingOrderModel;
    }
}

export { PendingOrderModel };
