import { UserModel } from "apps/user/models/UserTable";
// import { CartProductModel } from "database/schema/cart-product/cartProductModel";
import { parseCartDetails } from "../parser/cartDetailsParser";
import { ICartDetailRepo } from "./ICartDetailRepo";
import { OptionsValueModel } from "apps/optionsValue/models/OptionValueTable";
import { OptionsModel } from "apps/options/models/optionTable";
import { ProductModel } from "apps/product/model/productTable";
import { ProductVariationsModel } from "../../product-options/models/ProductVariationTable";
import { CartDetailsModel } from "../models/CartDetailTable";
import { CartProductModel } from "../../cart-products/model/CartProductTable";
import { ParsedCartDetail } from "../interface/CartDetail";

export class CartDetailRepo implements ICartDetailRepo {
    async getCartDetailByUserId(userId: number): Promise<ParsedCartDetail> {
        try {
            const cartDetails = await CartDetailsModel.findAll({
                where: { user_id: userId }, // Filter by user_id
                include: [
                    {
                        model: CartProductModel,
                        as: 'cartProducts', // Alias defined in the association
                        attributes: ['id', 'product_id', 'product_option_id', 'quantity', 'createdAt'],
                        include: [
                            {
                                model: ProductModel,  // Assuming you have a ProductModel
                                as: "product",  // Alias for Product (ensure the association is correct)
                                attributes: ['id', 'name', 'images'] // Specify which fields to include for the product
                            },
                            {
                                model: ProductVariationsModel,  // Assuming you have a ProductOptionsModel
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
            
            return cartDetailsData[0]
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
