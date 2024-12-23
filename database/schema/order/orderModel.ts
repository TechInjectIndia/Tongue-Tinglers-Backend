import { DataTypes, Model, Optional } from "sequelize";
import { BaseOrder, Order, ORDER_TYPE } from "../../../interfaces";
import { sequelize } from "../../../config";
import { NotesModel } from "./notesModel";
import { OrderItemsModel } from "../ecommerce/order_item.model";
import { Address } from "../../../types";

interface OrderCreationAttributes extends Optional<Order, "id"> {}

class OrderModel extends Model<Order, OrderCreationAttributes> implements BaseOrder {
    status!: string;
    item_count!: number;
    total!: number;
    anomalyArr!: number[];
    cancelled_items!: number[];
    customer_details!: number;
    delivery_details!: number;
    delivery_status!: string;
    payment_id!: number;
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

    // Mixin methods for managing notes
    public addNotes!: (note: NotesModel | number) => Promise<void>;
    public addNoteses!: (notes: Array<NotesModel | number>) => Promise<void>;
    public setNoteses!: (notes: Array<NotesModel | number>) => Promise<void>;
    public getNoteses!: () => Promise<NotesModel[]>;
    public removeNotes!: (note: NotesModel | number) => Promise<void>;
    public removeNoteses!: (notes: Array<NotesModel | number>) => Promise<void>;

    // Mixin methods for managing notes
    public addOrderItem!: (note: OrderItemsModel | number) => Promise<void>;
    public addOrderItems!: (notes: Array<OrderItemsModel | number>) => Promise<void>;
    public setOrderItemses!: (notes: Array<OrderItemsModel | number>) => Promise<void>;
    public getOrderItemses!: () => Promise<OrderItemsModel[]>;
    public removeOrderItems!: (note: OrderItemsModel | number) => Promise<void>;
    public removeOrderItemses!: (notes: Array<OrderItemsModel | number>) => Promise<void>;
}

OrderModel.init(
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        anomalyArr: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false,
        },
        cancelled_items: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false,
        },
        customer_details: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        delivery_details: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        delivery_status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        franchise_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        total_discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total_shipping: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total_tax: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        tableName: "order",
        timestamps: true,
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

OrderModel.belongsToMany(NotesModel, {
    through: "order_notes_join", // Join table name
    foreignKey: "orderId", // Foreign key in the join table
    otherKey: "notes_id", // Other foreign key in the join table
    as: "noteses", // Alias for the relationship
});

OrderModel.belongsToMany(OrderItemsModel, {
    through: "order_items_join", // Join table name
    foreignKey: "orderId", // Foreign key in the join table
    otherKey: "order_items_id", // Other foreign key in the join table
    as: "orderItems", // Alias for the relationship
});

export { OrderModel };
