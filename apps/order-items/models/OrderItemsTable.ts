import RepoProvider from "apps/RepoProvider";
import { BaseOrderItem, ORDER_ITEM_TYPE } from "../interface/orderItem";
import { sequelize } from "config";
import { OrderItem } from "../interface/orderItem";
import { DataTypes, Model, Optional } from "sequelize";

interface OrderItemCreationAttributes extends Optional<OrderItem, "id"> {}

class OrderItemsModel
    extends Model<OrderItem, OrderItemCreationAttributes>
    implements BaseOrderItem
{
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

    public static associate() {}

    public static initModel() {
        OrderItemsModel.init(
            {
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
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                total_tax: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                coupon_discount: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                points_discount: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                student_discount: {
                    type: DataTypes.DOUBLE,
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
            },
            {
                sequelize,
                tableName: "order_items",
                timestamps: true,
                paranoid: true,
            }
        );
        return OrderItemsModel;
    }

    public static hook() {
        OrderItemsModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "OrderItem",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the OrderItem
        OrderItemsModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "OrderItem",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the OrderItem
        OrderItemsModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "OrderItem",
                instance,
                options
            );
        });
    }
}

export { OrderItemsModel };
