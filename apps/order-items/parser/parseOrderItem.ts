import {OrderItem, ParsedOrderItem} from "../interface/orderItem";
import {parseProduct} from '../../product/parser/productParser'
import {parsedProductOptions} from "../../product/interface/ProductOptions";
import {ParsedOrder} from "../../order/interface/Order";
import {ParsedProduct} from "../../product/interface/Product";

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
        disc: {}
    }
    return data
}

export {parseOrderItem}
