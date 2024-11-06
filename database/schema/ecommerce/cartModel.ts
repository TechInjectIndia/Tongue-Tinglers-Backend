// models/CartModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { ICartAttributes, TCartItem } from "../../../interfaces";
import { CartItemModel } from './CartItemModel';

interface ICartCreationAttributes extends Optional<ICartAttributes, 'id'> { }

class CartModel extends Model<ICartAttributes, ICartCreationAttributes> implements ICartAttributes {
    public id!: string;
    public userId!: string;
    public totalAmount!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly items?: TCartItem[]; // Array of items in the cart
}

CartModel.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalAmount: {
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
        tableName: 'carts',
        timestamps: true,
    }
);

CartModel.hasMany(CartItemModel, { foreignKey: 'cart_id', as: 'cartItems' });

export { CartModel };
