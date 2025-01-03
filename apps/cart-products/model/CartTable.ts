import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config";
import { BaseCartProduct, CartProduct } from "../interface/Cart";
import RepoProvider from "apps/RepoProvider";

interface CartProductCreationAttributes extends Optional<CartProduct, "id"> {}

class CartProductModel
    extends Model<CartProduct, CartProductCreationAttributes>
    implements BaseCartProduct
{
    id: number;
    product_id: number;
    product_option_id: number;
    quantity: number;

    public static associate() {
        // CartProductModel.belongsTo(ProductModel, {
        //     foreignKey: 'product_id',  // Foreign key in CartProductModel
        //     as: 'product'  // Alias to use in the include
        // });
        // CartProductModel.belongsTo(ProductOptionsModel, {
        //     foreignKey: 'product_option_id',  // Foreign key in CartProductModel
        //     as: 'variations'  // Alias to use in the include
        // });
        // CartProductModel.belongsTo(ProductModel, {as: 'product', foreignKey: 'product_id'})
        // CartProductModel.belongsTo(ProductOptionsModel, {as: 'product_option', foreignKey: 'product_option_id'})
    }

    public static initModel() {
        CartProductModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                product_id: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                product_option_id: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: "CartProduct",
                tableName: "cart_products",
            }
        );
        return CartProductModel;
    }

    public static hook() {
        CartProductModel.addHook("afterCreate", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "create",
                "Cart",
                instance,
                options
            );
        });

        // After Update Hook - Log the updated fields of the Cart
        CartProductModel.addHook("afterUpdate", async (instance, options) => {
            // Now call logModelAction as before
            await RepoProvider.LogRepo.logModelAction(
                "update",
                "Cart",
                instance,
                options
            );
        });

        // After Destroy Hook - Log the deletion of the Cart
        CartProductModel.addHook("afterDestroy", async (instance, options) => {
            await RepoProvider.LogRepo.logModelAction(
                "delete",
                "Cart",
                instance,
                options
            );
        });
    }
}

export { CartProductModel };
