import { CartItemModel } from "../../../database/schema";
import { ICartItemAttributes } from "../../../interfaces";
import { ProductRepo } from "../../ecommerce/models/products";
import { RetortProductRepo } from "../../retort/models/products";

export class CartItemRepo {
    // Add a new product to the cart
    async create(cartItemData: ICartItemAttributes) {
        // Calculate the subtotal

        let productData: any;
        if (cartItemData.productType == 'retort') {
            productData = await new RetortProductRepo().get(cartItemData.productId as number);
        }
        if (cartItemData.productType == 'packaging') {
            productData = await new ProductRepo().get(cartItemData.productId as number);
        }
        if (productData) {
            const subtotal = productData.price * cartItemData.quantity;

            // Create a new cart item with subtotal
            const cartItem = await CartItemModel.create({
                ...cartItemData,
                price: productData.price,
                subtotal,
            });
            return cartItem;
        }
        return null;
    }

    // Update an existing cart item (quantity or price)
    async update(cartId: string, productId: number, productType: string, updateCartItemData: { quantity?: number }) {
        // Find the existing product in the cart

        let productData: any;
        if (productType == 'retort') {
            productData = await new RetortProductRepo().get(productId as number);
        }
        if (productType == 'packaging') {
            productData = await new ProductRepo().get(productId as number);
        }
        if (productData) {
            const cartItem = await CartItemModel.findOne({
                where: {
                    cart_id: cartId,
                    productId: productId,
                    productType
                },
            });

            if (!cartItem) {
                // If product does not exist in cart, return null
                return null;
            }

            // Update the quantity and/or price if provided
            if (updateCartItemData.quantity !== undefined) {
                cartItem.quantity = updateCartItemData.quantity;
            }

            if (productData.price) {
                cartItem.price = productData.price;
            }

            // Recalculate the subtotal based on the updated quantity and price
            cartItem.subtotal = cartItem.quantity * cartItem.price;

            // Save the updated cart item
            await cartItem.save();

            return cartItem;
        }
        return null;
    }

    // Remove a product from the cart
    async remove(cartId: string, productId: number, productType: string) {
        try {
            // Find the product in the cart
            const cartItem = await CartItemModel.findOne({
                where: {
                    cart_id: cartId,
                    productId: productId,
                    productType
                },
            });

            if (!cartItem) {
                // Product not found in the cart
                return null;
            }

            // Destroy the product (remove from cart)
            await cartItem.destroy();

            return cartItem; // Return the removed cart item (optional)
        } catch (error) {
            throw new Error(`Error removing product from cart: ${error.message}`);
        }
    }
}
