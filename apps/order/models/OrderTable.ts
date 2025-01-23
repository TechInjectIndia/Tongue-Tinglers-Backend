import { DataTypes, Model, Optional } from "sequelize";
import { BaseOrder, DeliveryStatus, Notes, Order, ORDER_TYPE, OrderPayload, OrderStatus, OrderTable, PAYMENT_TYPE } from "../interface/Order";
import { sequelize } from "../../../config";
import { NotesModel } from "./NotesTable";
import { OrderItemsModel } from "../../order-items/models/OrderItemsTable";
import RepoProvider from "apps/RepoProvider";
import { UserModel } from "apps/user/models/UserTable";
import { OrderItemPayload } from "apps/order-items/interface/orderItem";
import { BaseAddress } from "types";
import { FranchiseModel } from "apps/franchise/models/FranchiseTable";
import { LogModel } from "apps/logs/models/LogsTable";

interface OrderCreationAttributes extends Optional<OrderTable, "id"> {}

class OrderModel extends Model<OrderTable, OrderCreationAttributes> implements OrderTable {
    id: number;
    status: OrderStatus;
    total: number;
    totalTax: number;
    deliveryStatus: DeliveryStatus;
    customerDetails: number;
    paymentType: PAYMENT_TYPE;
    paymentId: string;
    cancelledItems: number[] | null;
    totalDiscount: number;
    deliveryDetails: any | null;
    shippingAddress: BaseAddress | null;
    billingAddress: BaseAddress | null;
    totalShipping: number;
    anomalyArr: number[] | null;
    price: Record<string, string | number>;
    orderType: ORDER_TYPE;
    franchise: number | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: number;
    updatedBy: number | null;
    deletedBy: number | null;

    // Mixin methods for managing notes
    public addNote!: (note: NotesModel | number) => Promise<void>;
    public addNotes!: (notes: Array<NotesModel | number>) => Promise<void>;
    public getNotes!: () => Promise<NotesModel[]>;
    public removeNote!: (note: NotesModel | number) => Promise<void>;
    public removeNotes!: (notes: Array<NotesModel | number>) => Promise<void>;
    
    public static associate(){
        OrderModel.belongsTo(UserModel, {
            foreignKey: 'customerDetails',
            as: 'customer'
        })

        OrderModel.hasMany(OrderItemsModel, {
            foreignKey: 'orderId', 
            as: 'orderItems' 
        });
       
        OrderModel.belongsToMany(NotesModel, {
            through: "order_notes_join", // Join table name
            foreignKey: "orderId", // Foreign key in the join table
            otherKey: "notes_id", // Other foreign key in the join table
            as: "notes", // Alias for the relationship
        });

        OrderModel.belongsTo(FranchiseModel, {
            foreignKey: 'franchise',
            as: 'franchiseData'
        })

        OrderModel.belongsTo(UserModel, {
            foreignKey: 'createdBy',
            as: 'createdByUser'
        })
        OrderModel.belongsTo(UserModel, {
            foreignKey: 'updatedBy',
            as: 'updatedByUser'
        })
        OrderModel.belongsTo(UserModel, {
            foreignKey: 'deletedBy',
            as: 'deletedByUser'
        })
        OrderModel.hasMany(LogModel, {
            foreignKey: "recordId", // The column in LogModel that references LeadsModel
            sourceKey: "id",        // The primary key in LeadsModel
            constraints: false,     // Disable constraints as `model` is dynamic
            as: "logs",             // Alias for the association
          });
    }

    public static initModel(){
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
        return OrderModel;
    }

    public static hook() {
            OrderModel.addHook("afterCreate", async (instance, options) => {
                await RepoProvider.LogRepo.logModelAction(
                    "create",
                    "Order",
                    instance,
                    options
                );
            });

            // After Update Hook - Log the updated fields of the Order
            OrderModel.addHook("afterUpdate", async (instance, options) => {
                // Now call logModelAction as before
                await RepoProvider.LogRepo.logModelAction(
                    "update",
                    "Order",
                    instance,
                    options
                );
            });

            // After Destroy Hook - Log the deletion of the Order
            OrderModel.addHook("afterDestroy", async (instance, options) => {
                await RepoProvider.LogRepo.logModelAction(
                    "delete",
                    "Order",
                    instance,
                    options
                );
            });
    }
}

export { OrderModel };
