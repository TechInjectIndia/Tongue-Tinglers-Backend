import {OrderItem, ParsedOrderItem} from "../interface/orderItem";
import {parseProduct} from '../../product/parser/productParser'
import {parsedProductOptions} from "../../product/interface/ProductOptions";
import {ParsedOrder} from "../../order/interface/Order";
import {ParsedProduct} from "../../product/interface/Product";
import { ProductModel } from "apps/product/model/productTable";
import { ProductVariationsModel } from "apps/product-options/models/ProductVariationTable";
import { OptionsValueModel } from "apps/optionsValue/models/OptionValueTable";
import { OptionsModel } from "apps/options/models/optionTable";
import { UserModel } from "apps/user/models/UserTable";
import { ProductsCategoryModel } from "apps/products-category/models/ProductCategoryTable";
import { ProductOptionRepo } from "apps/product-options/repos/productOptionsRepo";

// const parseOrderItem = (orderItem: OrderItem): ParsedOrderItem => {
//     const data: ParsedOrderItem = {
//         id: orderItem.id,
//         quantity: orderItem.quantity,
//         total_price: orderItem.total_price,
//         product: orderItem.product_id as unknown as  ParsedProduct,
//         productOption: parsedProductOptions(orderItem.product_option_id),
//         type: orderItem.type,
//         totalTax: orderItem.total_tax,
//         prices: {},
//         disc: {}
//     }
//     return data
// }

const parseOrderItem = async (orderItem: OrderItem): Promise<ParsedOrderItem> => {
    // Fetch product data with await
    const productData = await ProductModel.findOne({
        where: { id: orderItem.product_id },
        include: [
            {
                model: ProductVariationsModel,
                as: "variations",
                attributes: ["id", "optionValueId", "price", "stock", "status", "images"],
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
            {
                model: UserModel,
                as: "createdByUser",
                attributes: ["id", "firstName", "lastName", "email"],
            },
            {
                model: UserModel,
                as: "updatedByUser",
                attributes: ["id", "firstName", "lastName", "email"],
            },
            {
                model: UserModel,
                as: "deletedByUser",
                attributes: ["id", "firstName", "lastName", "email"],
            },
            {
                model: ProductsCategoryModel,
                as: "productCategory",
                attributes: ["id", "name", "description", "slug", "type", "status"],
            },
        ],
    });

    const productOptionData = ProductVariationsModel.findOne({
        where: { id: orderItem.product_option_id },
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
    })

    const resolvedProductOptions = await parsedProductOptions(productOptionData);

    // Construct ParsedOrderItem
    const data: ParsedOrderItem = {
        id: orderItem.id,
        quantity: orderItem.quantity,
        total_price: orderItem.total_price,
        product: productData as unknown as ParsedProduct, // Cast product data to ParsedProduct
        productOption: resolvedProductOptions,
        type: orderItem.type,
        totalTax: orderItem.total_tax,
        prices: {},
        disc: {},
    };

    return data;
};

export {parseOrderItem}
