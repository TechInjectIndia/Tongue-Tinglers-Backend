// models/CartItemModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { ICartItemAttributes } from "../../../interfaces";
import { ProductsModel } from './product.model';
import { RetortProductsModel } from '../retort/retort-product';

interface ICartItemCreationAttributes extends Optional<ICartItemAttributes, 'id'> { }

class CartItemModel extends Model<ICartItemAttributes, ICartItemCreationAttributes> implements ICartItemAttributes {
    public id!: number;
    public cart_id!: number;
    public productId!: number;
    public productType!: string;
    public quantity!: number;
    public price!: number;
    public subtotal!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
        this.belongsTo(ProductsModel, { foreignKey: 'productId', as: 'product' });
        this.belongsTo(RetortProductsModel, { foreignKey: 'productId', as: 'retortProduct' });
    }
}

CartItemModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true, 
        },
        cart_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'cart_items',
        timestamps: true,
    }
);

CartItemModel.associate();

export { CartItemModel };
