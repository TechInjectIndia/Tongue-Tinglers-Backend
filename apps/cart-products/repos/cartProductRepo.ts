import { BaseCartProduct, Cart, CartProduct, ParseCart, UpdateQuantity } from "../../../interfaces/cart_products";
import { ICartProductRepo } from "./ICartProductRepo";
import {CartProductModel} from "../../../database/schema/cart-product/cartProductModel";
import { CartDetailsModel } from "../../../database/schema/cart_details/cartDetailsModel";
import { ProductModel } from "../../../database/schema/product/productModel";
import { ProductOptionsModel } from "../../../database/schema/product-options/productOptionsModel";
import { Op } from "sequelize";
import { OptionsValueModel } from "../../../database/schema/optionsValue/optionsValueModel";
import { OptionsModel } from "../../../database/schema/options/optionModel";
import { parseCartProduct } from "../parser/cartProductParser";
export class CartProductRepo implements ICartProductRepo {

    async create(cartProduct:Cart): Promise<ParseCart | null> {
        const transaction = await CartProductModel.sequelize?.transaction();
        try {

            // Step 1: Bulk create cart products
            const createdCartProducts = await CartProductModel.bulkCreate(
                cartProduct.carts.map((product) => ({
                    product_id: product.product_id,
                    product_option_id: product.product_option_id, // todo @nitesh @sunil rename to option value id
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

            const userExist = await CartDetailsModel.findOne({
                where: {
                    user_id: cartProduct.user_id
                }
            })
            var createCartDetails = null;
            if(!userExist){
                createCartDetails = await CartDetailsModel.create(payload, { transaction })
            }else{
                createCartDetails = userExist
            }

            await createCartDetails.addCartProductses(cartProductIds);
            // await organization.addShippingAddresses(shippingAddresses);
            await transaction?.commit();
            // Return the created cart products (optional)

            const cartProductsWithDetails = await CartProductModel.findAll({
                where: {id: {[Op.in]:  cartProductIds} },
                include: [
                    {
                        model: ProductModel, // Assuming you have defined an association
                        as: 'product', // Alias name if used in associations
                    },
                    {
                        model: ProductOptionsModel, // Assuming you have defined an association
                        as: 'variations', // Alias name if used in associations
                        include: [
                            {
                              model: OptionsValueModel,
                              as: "optionsValue", // Include these fields from the User model
                              attributes: ["id", "name", "option_id"],
                              include:[
                                {
                                  model: OptionsModel,
                                  as: 'options',
                                  attributes:['id', 'name']
                                }
                              ]
                            }
                        ],
                    },
                ],
            }).then((cartProductData) => {
                return cartProductData.map((cartProduct) => {
                    return parseCartProduct(cartProduct)
                })
            })
            return {
                user_id: cartProduct.user_id, // Assuming `cartsts` comes from `createCartDetails`
                carts: cartProductsWithDetails,
            };
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
