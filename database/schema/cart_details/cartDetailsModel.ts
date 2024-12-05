import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { CartDetails, BaseCartDetails } from "../../../interfaces/cart_details";
import { CartProductModel } from "../cart-product/cartProductModel";

// Defining the interface for the creation attributes of CartDetails
interface CartDetailsCreationAttributes extends Optional<CartDetails, "id"> {}

class CartDetailsModel extends Model<CartDetails, CartDetailsCreationAttributes> implements BaseCartDetails {
    user_id: number;

    // Mixin methods for managing cart products
    public addCartProducts!: (cartProducts: CartProductModel | number) => Promise<void>;
    public addCartProductses!: (cartProductses: Array<CartProductModel | number>) => Promise<void>;
    public setCartProducts!: (cartProducts: Array<CartProductModel | number>) => Promise<void>;
    public getCartProducts!: () => Promise<CartProductModel[]>;

    // You can implement other methods as needed for your cart management.
}

// Initialize the CartDetailsModel with fields
CartDetailsModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'CartDetail',
        tableName: 'cart_details',
    }
);

// Defining the many-to-many relationship with CartProductModel through a join table
CartDetailsModel.belongsToMany(CartProductModel, {
    through: "cartProductsJoin", // Join table name
    foreignKey: "cartDetailId", // Foreign key in the join table
    otherKey: "cartProductsId", // Other foreign key in the join table
    as: "cartProductses", // Alias for the relationship
});

// Exporting the CartDetailsModel
export { CartDetailsModel };
