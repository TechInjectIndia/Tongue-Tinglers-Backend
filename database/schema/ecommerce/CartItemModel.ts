// models/CartItemModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { ICartItemAttributes } from "../../../interfaces";
import { CartModel } from './cartModel';

interface ICartItemCreationAttributes extends Optional<ICartItemAttributes, 'id'> { }

class CartItemModel extends Model<ICartItemAttributes, ICartItemCreationAttributes> implements ICartItemAttributes {
    public id!: string;
    public cart_id!: string;
    public productId!: number;
    public productType!: string;
    public quantity!: number;
    public price!: number;
    public subtotal!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CartItemModel.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        cart_id: {
            type: DataTypes.STRING,
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

export { CartItemModel };
