import { BaseOrderItem, OrderItem, ParsedOrderItem } from "../../../interfaces/order_items";
import {BaseOrder, Order, OrderPayload, ParsedOrder} from "../../../interfaces/orders"
import { parsedProductOptions } from "../../../interfaces/product-options";
import { parseOrderItem } from "../../order-items/parser/parseOrderItem";
import { parseProduct } from "../../product/parser/productParser";

const parseOrder = (order: any): ParsedOrder => {
    const productVariations = order.order_items.map((orderItem: any) =>
        parseOrderItem(orderItem)
    );
    const data: ParsedOrder = {
       id: order.id,
       order_items: productVariations,
       status: order.status,
       total: order.total,
       anomalyArr: order.anomalyArr,
       cancelled_items: order.cancelled_items,
       payment_id: order.payment_id,
       createdBy: order.createdBy,
       updatedBy: order.updatedBy,
       deletedBy: order.deletedBy,
       createdAt: order.createdAt,
       updatedAt: order.updatedAt,
       deletedAt: order.deletedAt,
       customer_details: order.customer_details,
       delivery_details: order.delivery_details,
       delivery_status: order.delivery_status,
       item_count: order.item_count,
       notes: order.notes,
       payment_type: order.payment_type,
       prices: order.prices,
       total_discount: order.total_discount,
       total_shipping: order.total_shipping,
       total_tax: order.total_tax,
       discount_prices: order.discount_prices
    };

    return data; // Return the result
};

export { parseOrder };