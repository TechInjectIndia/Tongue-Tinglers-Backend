import { CartModel } from "../../../database/schema";
import { CartItemModel } from "../../../database/schema";
// import { ProductsModel } from "../../../database/schema";
import { RetortProductsModel } from "../../../database/schema";
import { ProductImagesModel } from "../../../database/schema";
import { StockModel } from "../../../database/schema";
import { CartItemRepo } from "../../cart-item/models/CartItemRepo";

export class CartRepo {
    // Create a new cart
    async create(payload: any) {
        try {
            const cart = await CartModel.create(payload);
            return cart;
        } catch (error) {
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }

    async updateTotalAmount(cartId: number) {
        try {
            // Get all cart items for the specific cart
            const cartItems = await CartItemModel.findAll({ where: { cart_id: cartId } });

            // Calculate the total amount for the cart by summing up subtotals (quantity * price)
            let totalAmount = 0;
            for (const item of cartItems) {
                totalAmount += item.quantity * item.price; // Calculate subtotal for each item
            }

            if (cartItems && cartItems.length == 0) {
                const cartData = await CartModel.destroy({
                    where: { id: cartId },
                });
            }
            // Update the total amount in the Cart table
            await CartModel.update({ totalAmount }, { where: { id: cartId } });

            const cart = await CartModel.findOne({ where: { id: cartId } });
            if (!cart) {
                return null; // Cart doesn't exist
            }
            return cart;
        } catch (error) {
            throw new Error(`Error updating total amount for cart: ${error.message}`);
        }
    }

    // Add product to the cart
    async addProduct(userId: number, productId: number, quantity: number, productType: string) {
        try {
            // Find if the cart already exists for the user
            let cart = await CartModel.findOne({ where: { userId } });
            if (!cart) {
                // If cart doesn't exist, create a new cart
                cart = await CartModel.create({ userId });
            }

            // Check if the product already exists in the cart
            const existingProduct = await CartItemModel.findAll({
                where: {
                    productId,
                    cart_id: cart.id,
                    productType
                },
            });

            let cartItemReponse: any;
            if (existingProduct.length > 0) {
                // If product exists, update the quantity and price
                const updateCartItemData = {
                    quantity: quantity,
                };
                if (quantity == 0) {
                    const cartItem = await new CartItemRepo().remove(cart.id as number, productId as number, productType);
                } else {
                    cartItemReponse = await new CartItemRepo().update(cart.id as number, productId as number, productType, updateCartItemData);
                }
            } else {
                // If product doesn't exist, add the new product to the cart
                cartItemReponse = await new CartItemRepo().create({
                    cart_id: cart.id,
                    productId,
                    productType,
                    quantity,
                });
            }

            const cartData = await this.updateTotalAmount(cart.id);
            return cartData;
        } catch (error) {
            throw new Error(`Error adding product to cart: ${error.message}`);
        }
    }

    // Remove product from the cart
    async removeProduct(userId: number, productId: number, productType: string) {
        try {
            // Find the cart associated with the user
            const cart = await CartModel.findOne({ where: { userId } });
            if (!cart) {
                return null; // Cart doesn't exist
            }

            // Use CartItemRepo to remove the product from the cart
            const removedProduct = await new CartItemRepo().remove(cart.id, productId, productType);
            if (!removedProduct) {
                return null; // Product not found in the cart
            }

            const cartData = await this.updateTotalAmount(cart.id);
            return cartData;
        } catch (error) {
            throw new Error(`Error removing product from cart: ${error.message}`);
        }
    }

    // Update product in the cart (quantity or price)
    async updateProduct(userId: number, productId: number, quantity: number, productType: string) {
        try {
            const cart = await CartModel.findOne({ where: { userId } });
            if (!cart) {
                return null; // Cart doesn't exist
            }

            // Check if the product already exists in the cart
            const existingProduct = await CartItemModel.findAll({
                where: {
                    productId,
                    cart_id: cart.id
                },
            });

            if (existingProduct.length > 0) {
                const updateCartItemData = {
                    quantity: existingProduct[0].quantity - quantity,
                };
                if (updateCartItemData.quantity < 0) {
                    const cartItem = await new CartItemRepo().remove(cart.id as number, productId as number, productType);
                } else {
                    const cartItem = await new CartItemRepo().update(cart.id as number, productId as number, productType, updateCartItemData);
                }
            }

            const cartData = await this.updateTotalAmount(cart.id);
            return cart;
        } catch (error) {
            throw new Error(`Error updating product in cart: ${error.message}`);
        }
    }

    // Get a cart by user ID
    async findById(userId: number) {
        try {
            const cart = await CartModel.findOne({
                where: { userId },
                include: [{
                    model: CartItemModel,
                    as: 'items',
                    // include: [{
                    //     model: ProductsModel,
                    //     as: 'product',
                    //     include: [{
                    //         model: ProductImagesModel,
                    //         as: 'images',
                    //     },
                    //     {
                    //         model: StockModel,
                    //         as: 'stock',
                    //     }
                    //     ],
                    // },
                    // {
                    //     model: RetortProductsModel,
                    //     as: 'retortProduct',
                    // }],
                }]
            });
            return cart;
        } catch (error) {
            throw new Error(`Error fetching cart: ${error.message}`);
        }
    }

    // Empty a cart (remove all products)
    async empty(cartId: number) {
        try {
            const cart = await CartModel.findByPk(cartId);
            if (!cart) {
                return null; // Cart doesn't exist
            }

            // Remove all products related to the cart
            await CartItemModel.destroy({
                where: { cart_id: cartId },
            });

            const cartData = await CartModel.destroy({
                where: { id: cartId },
            });

            return cartData; // Return the cart after emptying it
        } catch (error) {
            throw new Error(`Error emptying cart: ${error.message}`);
        }
    }

    // Empty a cart (remove all products)
    async update(cartId: number, updateCartData: any) {
        try {
            const cart = await CartModel.findByPk(cartId);
            if (cart) {

            }
            return cart;
        } catch (error) {
            throw new Error(`Error emptying cart: ${error.message}`);
        }
    }

    // Delete a cart by ID
    async delete(cartId: number) {
        try {
            const cart = await CartModel.findByPk(cartId);
            if (cart) {
                await CartModel.destroy();
            }
            return cart;
        } catch (error) {
            throw new Error(`Error deleting cart: ${error.message}`);
        }
    }
}
