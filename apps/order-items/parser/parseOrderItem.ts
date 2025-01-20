import {OrderItem, ParsedOrderItem} from "../interface/orderItem";
import {parseProduct} from '../../product/parser/productParser'
import {
    ParsedProductOptions,
    parsedProductOptions
} from "../../product/interface/ProductOptions";
import {ParsedOrder} from "../../order/interface/Order";
import {ParsedProduct} from "../../product/interface/Product";
import { ProductModel } from "apps/product/model/productTable";
import { ProductVariationsModel } from "apps/product-options/models/ProductVariationTable";
import { OptionsValueModel } from "apps/optionsValue/models/OptionValueTable";
import { OptionsModel } from "apps/options/models/optionTable";
import { UserModel } from "apps/user/models/UserTable";
import { ProductsCategoryModel } from "apps/products-category/models/ProductCategoryTable";
import { ProductOptionRepo } from "apps/product-options/repos/productOptionsRepo";
import RepoProvider from "../../RepoProvider";

const parseOrderItem = (orderItem: OrderItem): ParsedOrderItem => {

    if(orderItem && !orderItem.id){
        orderItem.id = 0;
    }

    console.log(orderItem)

    const data: ParsedOrderItem = {
        id: orderItem.id,
        quantity: orderItem.quantity,
        total_price: orderItem.total_price,
        product: orderItem.product_id as unknown as  ParsedProduct,
        // productOption: parsedProductOptions(orderItem.product_option_id),
        productOption: orderItem.product_option_id as unknown as ParsedProductOptions,
        type: orderItem.type,
        totalTax: orderItem.total_tax,
        prices: {},
        disc: {},
    };

    console.log(data)

    return data;
};

export {parseOrderItem}
