import { BaseOrderItem, OrderItem, ParsedOrderItem } from "../../../interfaces/order_items";
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
        couponDiscount: orderItem.coupon_discount,
        pointsDiscount: orderItem.points_discount,
        studentDiscount: orderItem.student_discount,
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
