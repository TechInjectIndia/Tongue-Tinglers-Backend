import { BaseOrderItem, OrderItem, ParsedOrderItem } from "../../../interfaces/order_items";
import {parseProduct} from '../../product/parser/productParser'
import { parsedProductOptions } from "../../../interfaces/product-options";
const parseOrderItem = (orderItem: OrderItem) : ParsedOrderItem => {

    const data: ParsedOrderItem = {
        id: orderItem.id,
        quantity: orderItem.quantity,
        total_price: orderItem.total_price,
        product: parseProduct(orderItem.product_id),
        product_option_id: parsedProductOptions(orderItem.product_option_id),
        type: orderItem.type,
        total_tax: orderItem.total_tax,
        coupon_discount: orderItem.coupon_discount,
        points_discount: orderItem.points_discount,
        student_discount: orderItem.student_discount,
        createdBy: orderItem.createdBy,
        updatedBy: orderItem.updatedBy,
        deletedBy: orderItem.deletedBy,
        createdAt: orderItem.createdAt,
        updatedAt: orderItem.updatedAt,
        deletedAt: orderItem.deletedAt,
    }
    return data
}

export {parseOrderItem}