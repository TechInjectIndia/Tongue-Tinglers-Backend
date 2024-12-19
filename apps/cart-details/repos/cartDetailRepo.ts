
import { CartProductModel } from "../../../database/schema/cart-product/cartProductModel";
import { CartDetailsModel } from "../../../database/schema/cart_details/cartDetailsModel";
import { ProductOptionsModel } from "../../../database/schema/product-options/productOptionsModel";
import { ProductModel } from "../../../database/schema/product/productModel";
import { ICartDetailRepo } from "./ICartDetailRepo";
import {parseCartDetails} from "../parser/cartDetailsParser"
import { Op, Sequelize } from "sequelize";
import { OptionsValueModel } from "../../../database/schema/optionsValue/optionsValueModel";
import { OptionsModel } from "../../../database/schema/options/optionModel";
import { UserModel } from "../../../database/schema";

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
                                as: "variations",  // Alias for ProductOptions (ensure the association is correct)
                                attributes: ['id', "product_id", "optionValueId", "price", "stock", "status", "images"], // Specify which fields to include for the product option
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
                                ]
                            }
                        ]
                    },
                    {
                        model: UserModel,
                        as: 'users',
                        attributes: ['id','firstName', 'lastName', 'email']
                    }
                ],
                order: [['createdAt', 'DESC']], 
            });
            const cartDetailsData = cartDetails.map((cartDetail) => {
                return parseCartDetails(cartDetail)
            })
            return cartDetailsData
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}