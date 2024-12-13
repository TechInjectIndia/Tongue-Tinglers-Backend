import { BaseCartProduct, CartProduct, UpdateQuantity } from "../../../interfaces/cart_products";
import { ICartProductRepo } from "./ICartProductRepo";
import {CartProductModel} from "../../../database/schema/cart-product/cartProductModel";
import { CartDetailsModel } from "../../../database/schema/cart_details/cartDetailsModel";
export class CartProductRepo implements ICartProductRepo {
    async create(cartProduct:any): Promise<any | null> {
        const transaction = await CartProductModel.sequelize?.transaction();
        try {

            // Step 1: Bulk create cart products
            const createdCartProducts = await CartProductModel.bulkCreate(
                cartProduct.carts.map((product) => ({
                    product_id: product.product_id,
                    product_option_id: product.product_option_id,
                    quantity: product.quantity,
                })),
                { transaction, returning: true } // Return created rows
            );

            let cartProductIds: number[] = []; 
            cartProductIds = createdCartProducts.map((option) => option.id);
            let payload = {
                // cart_ids: cartProductIds,
                user_id: cartProduct.user_id
            }
            const createCartDetails = await CartDetailsModel.create(payload, { transaction })
            
            await createCartDetails.addCartProductses(cartProductIds);
            // await organization.addShippingAddresses(shippingAddresses);
            await transaction?.commit();
            // Return the created cart products (optional)
            return createdCartProducts.map((product) => product.toJSON());
        } catch (error) {
            console.log(error);
            await transaction?.rollback();
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
}