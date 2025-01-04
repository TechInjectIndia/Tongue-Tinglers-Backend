// import { CartDetailsModel } from "database/schema/cart_details/cartDetailsModel";
import { Cart, CartProduct, ParseCart, ParsedCartProduct, UpdateQuantity } from "../interface/Cart";
import { CartProductModel } from "../model/CartProductTable";
import { ICartProductRepo } from "./ICartProductRepo";
// import { ProductModel } from "database/schema/product/productModel";
// import { ProductOptionsModel } from "database/schema/product-options/productOptionsModel";
import { OptionsModel } from "apps/options/models/optionTable";
import { OptionsValueModel } from "apps/optionsValue/models/OptionValueTable";
import { Op } from "sequelize";
import { parseCartProduct, parseCartProductDetails } from "../parser/cartProductParser";
import { ProductModel } from "apps/product/model/productTable";
import { ProductVariationsModel } from "../../product-options/models/ProductVariationTable";
import { CartDetailsModel } from "apps/cart-details/models/CartDetailTable";
import RepoProvider from "apps/RepoProvider";
import { ParsedCartDetail } from "apps/cart-details/interface/CartDetail";
import { UserModel } from "apps/user/models/UserTable";

export class CartProductRepo implements ICartProductRepo {
    async create(cartProduct: Cart): Promise<ParsedCartDetail | null> {
        const transaction = await CartProductModel.sequelize?.transaction();
        try {
            console.log("Transaction started for creating cart products");

            // Step 1: Bulk create cart products
            const createdCartProducts = await CartProductModel.bulkCreate(
                cartProduct.carts.map((product) => ({
                    product_id: product.product_id,
                    product_option_id: product.product_option_id,
                    quantity: product.quantity,
                })),
                { transaction, returning: true }
            );

            const cartProductIds = createdCartProducts.map((option) => option.id);
            console.log("Created cart products with IDs:", cartProductIds);

            // Step 2: Find or create cart details for the user
            const [userCart, created] = await CartDetailsModel.findOrCreate({
                where: { user_id: cartProduct.user_id },
                defaults: { user_id: cartProduct.user_id },
                transaction,
                lock: transaction.LOCK.UPDATE,
                include: { model: UserModel, as: "cartUser" }, // Prevent concurrent modifications
            });

            console.log("userCart got--->", userCart);

            if (created) {
                console.log("New cart created for user ID:", cartProduct.user_id);
            } else {
                console.log("Existing cart found for user ID:", cartProduct.user_id);
            }

            // Step 3: Associate cart products with cart details
            await userCart.addCartProducts(cartProductIds, { transaction });

            // Step 4: Fetch cart products with details for the response
            const cartProductsWithDetails = await CartProductModel.findAll({
                where: { id: { [Op.in]: cartProductIds } },
                include: [
                    {
                        model: ProductModel,
                        as: "product",
                    },
                    {
                        model: ProductVariationsModel,
                        as: "variations",
                        include: [
                            {
                                model: OptionsValueModel,
                                as: "optionsValue",
                                attributes: ["id", "name", "option_id"],
                                include: [
                                    {
                                        model: OptionsModel,
                                        as: "options",
                                        attributes: ["id", "name"],
                                    },
                                ],
                            },
                        ],
                    },
                ],
                transaction,
            }).then((cartProductData) =>
                cartProductData.map((cartProduct) => parseCartProductDetails(cartProduct))
            );

            // Commit the transaction
            await transaction?.commit();
            console.log("Transaction committed successfully");

            return {
                id: userCart.id,
                user: { id: 0, firstName: "test", lastName: "test", email: "wwe" },
                cart: cartProductsWithDetails,
            };
        } catch (error) {
            console.error("Error during transaction:", error);

            // Rollback the transaction on error
            if (transaction) {
                try {
                    await transaction.rollback();
                    console.log("Transaction rolled back successfully");
                } catch (rollbackError) {
                    console.error("Error rolling back transaction:", rollbackError);
                }
            }

            return null;
        }
    }

    update(product: CartProduct): Promise<CartProduct> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<CartProduct> {
        try {
            const cartProduct = await CartProductModel.findByPk(id);

            if (!cartProduct) {
                throw new Error(`CartProduct with ID ${id} not found`);
            }

            await cartProduct.destroy();

            return cartProduct.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateQuantity(quantityUpdate: UpdateQuantity): Promise<CartProduct> {
        try {
            const existingCartProduct = await CartProductModel.findOne({
                where: {
                    id: quantityUpdate.id,
                    product_id: quantityUpdate.product_id,
                    product_option_id: quantityUpdate.product_option_id,
                },
            });

            if (!existingCartProduct) {
                throw new Error(`Cart not found`);
            }

            await existingCartProduct.update({
                quantity: quantityUpdate.quantity,
            });

            return existingCartProduct.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getCartById(id: number): Promise<ParsedCartProduct> {
        try {
            const cartProductsWithDetails = await CartProductModel.findOne({
                where: { id: id },
                include: [
                    {
                        model: ProductModel, // Assuming you have defined an association
                        as: "product", // Alias name if used in associations
                    },
                    {
                        model: ProductVariationsModel, // Assuming you have defined an association
                        as: "variations", // Alias name if used in associations
                        include: [
                            {
                                model: OptionsValueModel,
                                as: "optionsValue", // Include these fields from the User model
                                attributes: ["id", "name", "option_id"],
                                include: [
                                    {
                                        model: OptionsModel,
                                        as: "options",
                                        attributes: ["id", "name"],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            return parseCartProduct(cartProductsWithDetails);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async clearUserCart(userId: number) {
        try {
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
