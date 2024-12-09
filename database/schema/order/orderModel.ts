import { DataTypes, Model, Optional } from "sequelize";
import { BaseNotes, BaseOrder, Order } from "../../../interfaces";
import { sequelize } from "../../../config";
import { NotesModel } from "./notesModel";

interface OrderCreationAttributes extends Optional<Order, "id"> {}

class OrderModel extends Model<Order, OrderCreationAttributes> implements BaseOrder {
    order_items!: number[];
    status!: string;
    item_count!: number;
    total!: number;
    anomalyArr!: number[];
    cancelled_items!: number;
    customer_details!: number;
    delivery_details!: number;
    delivery_status!: string;
    payment_id!: number;
    payment_type!: string;
    total_discount!: number;
    total_shipping!: number;
    total_tax!: number;
    prices!: string | null;
    discount_prices!: string | null;
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
}

OrderModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        order_items: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false,
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
            type: DataTypes.INTEGER,
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

export { OrderModel };
