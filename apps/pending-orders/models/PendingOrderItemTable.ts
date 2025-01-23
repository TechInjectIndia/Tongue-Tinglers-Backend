import RepoProvider from "apps/RepoProvider";
import { sequelize } from "config";
import { PendingOrderItemTable} from "../interface/PendingOrderItem";
import { DataTypes, Model, Optional } from "sequelize";
import { ProductModel } from "apps/product/model/productTable";
import { ProductVariationsModel } from "apps/product-options/models/ProductVariationTable";
import { PRODUCTS_TYPE } from "apps/product/interface/Product";
import { UserModel } from "apps/user/models/UserTable";
import { OrderModel } from "apps/order/models/OrderTable";
import { PendingOrderModel } from "./PendingOrderTable";

interface PendingOrderItemCreationAttributes extends Optional<PendingOrderItemTable, "id"> {}

class PendingOrderItemModel
    extends Model<PendingOrderItemTable, PendingOrderItemCreationAttributes>
    implements PendingOrderItemTable
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
        PendingOrderItemModel.belongsTo(ProductModel,{
            foreignKey:'product',
            as: 'productData'
        })
        PendingOrderItemModel.belongsTo(ProductVariationsModel,{
            foreignKey:'variation',
            as: 'variationData'
        })
        PendingOrderItemModel.belongsTo(UserModel, {
            foreignKey: 'createdBy',
            as: 'createdByUser'
        })
        PendingOrderItemModel.belongsTo(UserModel, {
            foreignKey: 'updatedBy',
            as: 'updatedByUser'
        })
        PendingOrderItemModel.belongsTo(UserModel, {
            foreignKey: 'deletedBy',
            as: 'deletedByUser'
        })
        PendingOrderItemModel.belongsTo(PendingOrderModel, {
            foreignKey: 'orderId',
            as: 'orderData'
        })
    }

    public static initModel() {
        PendingOrderItemModel.init(
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
                tableName: "Pending-Order-Items",
                timestamps: true,
            }
        );
        return PendingOrderItemModel;
    }
}

export { PendingOrderItemModel };
