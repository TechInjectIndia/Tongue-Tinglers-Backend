
import { CartProductModel } from "../../../database/schema/cart-product/cartProductModel";
import { CartDetailsModel } from "../../../database/schema/cart_details/cartDetailsModel";
import { ProductOptionsModel } from "../../../database/schema/product-options/productOptionsModel";
import { ProductModel } from "../../../database/schema/product/productModel";
import { ICartDetailRepo } from "./ICartDetailRepo";
import { Op, Sequelize } from "sequelize";

export class CartDetailRepo implements ICartDetailRepo {
    async getCartDetailByUserId(userId: number): Promise<any> {
        try {
            const cartDetails = await CartDetailsModel.findAll({
                where: { user_id: userId }, // Filter by user_id
                include: [
                    {
                        model: CartProductModel,
                        as: 'cartProductses', // Alias defined in the association
                        attributes: ['id', 'product_id', 'product_option_id', 'quantity', 'createdAt'],
                        include: [
                            {
                                model: ProductModel,  // Assuming you have a ProductModel
                                as: "product",  // Alias for Product (ensure the association is correct)
                                attributes: ['id', 'name'] // Specify which fields to include for the product
                            },
                            {
                                model: ProductOptionsModel,  // Assuming you have a ProductOptionsModel
                                as: "productOption",  // Alias for ProductOptions (ensure the association is correct)
                                attributes: ['id', "product_id", "option_value_id", "price", "stock", "status", "images"] // Specify which fields to include for the product option
                            }
                        ]
                    },
                ],
                order: [['createdAt', 'DESC']], 
            });
            return cartDetails;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}