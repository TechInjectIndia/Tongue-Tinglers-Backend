import { BaseOrderItem, OrderItem, ParsedOrderItem } from "../../order-items/interface/orderItem";
import {BaseOrder, Order, OrderPayload, ParsedOrder} from "../interface/Order"
import { parsedProductOptions } from "../../../interfaces/product-options";
import { parseOrderItem } from "../../order-items/parser/parseOrderItem";
import { parseProduct } from "../../product/parser/productParser";

const parseOrder = (order: any): ParsedOrder => {
    const productVariations = order.order_items.map((orderItem: any) =>
        parseOrderItem(orderItem)
    );
    const data: ParsedOrder = {
        id: order.id,
        orderItems: productVariations,
        status: order.status,
        total: order.total,
        anomalyArr: order.anomalyArr,
        cancelledItems: order.cancelled_items,
        paymentId: order.payment_id,
        createdBy: order.createdBy,
        updatedBy: order.updatedBy,
        deletedBy: order.deletedBy,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        deletedAt: order.deletedAt,
        customerDetails: order.customer_details,
        deliveryDetails: order.delivery_details,
        deliveryStatus: order.delivery_status,
        notes: order.notes,
        paymentType: order.payment_type,
        totalDiscount: order.total_discount,
        totalShipping: order.total_shipping,
        totalTax: order.total_tax,
        shippingAddress: undefined,
        coupon: "",
        items: []
    };

    return data; // Return the result
};

export { parseOrder };
