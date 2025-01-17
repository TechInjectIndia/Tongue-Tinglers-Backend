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

const parseOrderItem = (orderItem: OrderItem): ParsedOrderItem => {
    const data: ParsedOrderItem = {
        id: orderItem.id,
        quantity: orderItem.quantity,
        total_price: orderItem.total_price,
        product: orderItem.product_id as unknown as  ParsedProduct,
        productOption: parsedProductOptions(orderItem.product_option_id),
        type: orderItem.type,
        totalTax: orderItem.total_tax,
        prices: {},
        disc: {},
    };

    return data;
};

export {parseOrderItem}
