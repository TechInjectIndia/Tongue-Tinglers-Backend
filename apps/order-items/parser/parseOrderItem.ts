import { BaseOrderItem, OrderItem, ParsedOrderItem } from "../interface/orderItem";
import {parseProduct} from '../../product/parser/productParser'
import { parsedProductOptions } from "../../../interfaces/product-options";
const parseOrderItem = (orderItem: OrderItem) : ParsedOrderItem => {

    const data: ParsedOrderItem = {
        id: orderItem.id,
        quantity: orderItem.quantity,
        total_price: orderItem.total_price,
        product: parseProduct(orderItem.product_id),
        productOptionId: parsedProductOptions(orderItem.product_option_id),
        type: orderItem.type,
        totalTax: orderItem.total_tax,
        prices: [],
        disc: []
    }
    return data
}

export {parseOrderItem}
