import RepoProvider from "apps/RepoProvider";
import { BaseOrderItem, ORDER_ITEM_TYPE, OrderItemPayload, OrderItemTable } from "../interface/orderItem";
import { sequelize } from "config";
import { OrderItem } from "../interface/orderItem";
import { DataTypes, Model, Optional } from "sequelize";
import { ProductModel } from "apps/product/model/productTable";
import { ProductVariationsModel } from "apps/product-options/models/ProductVariationTable";
import { PRODUCTS_TYPE } from "apps/product/interface/Product";
import { UserModel } from "apps/user/models/UserTable";
import { OrderModel } from "apps/order/models/OrderTable";

interface OrderItemCreationAttributes extends Optional<OrderItemTable, "id"> {}

class OrderItemsModel
    extends Model<OrderItemTable, OrderItemCreationAttributes>
    implements OrderItemTable
{
    id: number;
    orderId: number;
    product: number;
    variation: number;
    quantity: number;
    totalPrice: number;
    price: Record<string, string | number>;
    totalTax: number;
    couponDiscount: number;
    type: PRODUCTS_TYPE;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    public static associate() {
        OrderItemsModel.belongsTo(ProductModel,{
            foreignKey:'product',
            as: 'productData'
        })
        OrderItemsModel.belongsTo(ProductVariationsModel,{
            foreignKey:'variation',
            as: 'variationData'
        })
        OrderItemsModel.belongsTo(UserModel, {
            foreignKey: 'createdBy',
            as: 'createdByUser'
        })
        OrderItemsModel.belongsTo(UserModel, {
            foreignKey: 'updatedBy',
            as: 'updatedByUser'
        })
        OrderItemsModel.belongsTo(UserModel, {
            foreignKey: 'deletedBy',
            as: 'deletedByUser'
        })
        OrderItemsModel.belongsTo(OrderModel, {
            foreignKey: 'orderId',
            as: 'orderData'
        })
    }

    public static initModel() {
        OrderItemsModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                orderId:{
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                product: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                variation: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                price: {
                    type: DataTypes.JSONB,
                    allowNull: false,
                },
                totalPrice: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                totalTax: {
                    type: DataTypes.DOUBLE,
                    allowNull: true,
                },
                couponDiscount: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                type: {
                    type: DataTypes.ENUM(...Object.values(PRODUCTS_TYPE)),
                    allowNull: false,
                    defaultValue: PRODUCTS_TYPE.RETORT,
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
                tableName: "Order-Items",
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
