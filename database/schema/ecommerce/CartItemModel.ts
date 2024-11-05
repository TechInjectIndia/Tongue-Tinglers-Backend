// models/CartItemModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { ICartItemAttributes } from "../../../interfaces";

interface ICartItemCreationAttributes extends Optional<ICartItemAttributes, 'id'> {}

class CartItemModel extends Model<ICartItemAttributes, ICartItemCreationAttributes> implements ICartItemAttributes {
    public id!: string;
    public cart_id!: string;
    public productId!: string;
    public quantity!: number;
    public price!: number;
    public subtotal!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        // Each CartItem belongs to a Cart
        CartItemModel.belongsTo(models.CartModel, { foreignKey: 'cart_id', as: 'cart' });
    }
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
