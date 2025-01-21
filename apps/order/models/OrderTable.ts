import { DataTypes, Model, Optional } from "sequelize";
import { BaseOrder, Order, ORDER_TYPE } from "../interface/Order";
import { sequelize } from "../../../config";
import { NotesModel } from "./NotesTable";
import { OrderItemsModel } from "../../order-items/models/OrderItemsTable";
import { Address } from "../../address/interface/Address";
import RepoProvider from "apps/RepoProvider";
import { CommissionVoucherModel, ICommissionVoucher } from "apps/commission/model/CommissionVoucherTable";
import { COMMISSION_VOUCHER_ENTITIES } from "apps/commission/model/CommissionEntityMappingTable";
import { UserModel } from "apps/user/models/UserTable";
import { FranchiseModel } from "apps/franchise/models/FranchiseTable";

interface OrderCreationAttributes extends Optional<Order, "id"> {}

class OrderModel extends Model<Order, OrderCreationAttributes> implements BaseOrder {
    status!: string;
    item_count!: number;
    total!: number;
    anomalyArr!: number[];
    cancelled_items!: number[];
    customer_details!: number;
    delivery_details!: string;
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
    createdBy!: number | null;
    updatedBy!: number | null;
    deletedBy!: number | null;

    // Mixin methods for managing notes
    public addNote!: (note: NotesModel | number) => Promise<void>;
    public addNotes!: (notes: Array<NotesModel | number>) => Promise<void>;

    public getNotes!: () => Promise<NotesModel[]>;
    public removeNote!: (note: NotesModel | number) => Promise<void>;
    public removeNotes!: (notes: Array<NotesModel | number>) => Promise<void>;

    // Mixin methods for managing notes
    public addOrderItem!: (note: OrderItemsModel | number) => Promise<void>;
    public addOrderItems!: (notes: Array<OrderItemsModel | number>) => Promise<void>;
    public setOrderItemses!: (notes: Array<OrderItemsModel | number>) => Promise<void>;
    public getOrderItemses!: () => Promise<OrderItemsModel[]>;
    public removeOrderItems!: (note: OrderItemsModel | number) => Promise<void>;
    public removeOrderItemses!: (notes: Array<OrderItemsModel | number>) => Promise<void>;

    // todo
    public addAnomalyOrderItems:(anomalies:Array<any|number>)=>Promise<void>;

    public static associate(){
        OrderModel.belongsTo(UserModel, {
            foreignKey: 'customer_details',
            as: 'customer'
        })
        // OrderModel.belongsTo(FranchiseModel, {
        //     foreignKey: 'franchise',
        //     as: 'franchiseData'
        // })
        OrderModel.belongsToMany(NotesModel, {
            through: "order_notes_join", // Join table name
            foreignKey: "orderId", // Foreign key in the join table
            otherKey: "notes_id", // Other foreign key in the join table
            as: "notes", // Alias for the relationship
        });

        OrderModel.belongsToMany(OrderItemsModel, {
            through: "order_items_join", // Join table name
            foreignKey: "orderId", // Foreign key in the join table
            otherKey: "order_items_id", // Other foreign key in the join table
            as: "orderItems", // Alias for the relationship
        });

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
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                delivery_status: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                franchise: {
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
                    type: DataTypes.DOUBLE,
                    allowNull: true,
                },
                prices: {
                    type: DataTypes.STRING,
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

    public async createAddVoucher(voucherData: Partial<ICommissionVoucher>) {
        return await this.createAddVoucher({ ...voucherData, entityType: COMMISSION_VOUCHER_ENTITIES.ORDER_COMMISSION });
    }
}

export { OrderModel };
