import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { CartDetails, BaseCartDetails } from "../../../interfaces/cart_details";
// import { CartProductModel } from "";

import RepoProvider from "apps/RepoProvider";
import { CartProductModel } from "apps/cart-products/model/CartTable";

// Defining the interface for the creation attributes of CartDetails
interface CartDetailsCreationAttributes extends Optional<CartDetails, "id"> {}

class CartDetailsModel
    extends Model<CartDetails, CartDetailsCreationAttributes>
    implements BaseCartDetails
{
    user_id: number;

    // Mixin methods for managing cart products
    public addCartProducts!: (
        cartProducts: CartProductModel | number
    ) => Promise<void>;
    public addCartProductses!: (
        cartProductses: Array<CartProductModel | number>
    ) => Promise<void>;
    public setCartProducts!: (
        cartProducts: Array<CartProductModel | number>
    ) => Promise<void>;
    public getCartProducts!: () => Promise<CartProductModel[]>;

    public static associate() {
        // Defining the many-to-many relationship with CartProductModel through a join table
        this.belongsToMany(CartProductModel, {
            through: "cartProductsJoin", // Join table name
            foreignKey: "cartDetailId", // Foreign key in the join table
            otherKey: "cartProductsId", // Other foreign key in the join table
            as: "cartProductses", // Alias for the relationship
        });

        // UserModel.hasMany(CartDetailsModel, {as: 'cartUser', foreignKey: 'user_id'})
        // CartDetailsModel.belongsTo(UserModel, {as: 'users', foreignKey: 'user_id'})
    }

    public static initModel() {
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
                modelName: "CartDetail",
                tableName: "cart_details",
            }
        );
        return CartDetailsModel;
    }

    public static hook() {
        CartDetailsModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Cart Details",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the Cart Details
        CartDetailsModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Cart Details",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the Cart Details
        CartDetailsModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Cart Details",
                instance,
                options
            );
        });
    }
}

// Exporting the CartDetailsModel
export { CartDetailsModel };
