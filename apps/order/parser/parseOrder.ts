import {ParsedOrder} from "../interface/Order"
import {parseOrderItem} from "../../order-items/parser/parseOrderItem";
import {PRICE_COMP_TYPE_CART, VALUE_TYPE} from "../interface/OrderItem";


const parseOrder = (order: any): ParsedOrder => {
    const productVariations = order.order_items.map((orderItem: any) =>
        parseOrderItem(orderItem)
    );
    console.log(order)
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
        shippingAddress:order.shippingAddress,
        billingAddress:order.billingAddress,
        coupon: null,
        items: [],
        discount: {},
        price: {total: {
                type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                percent: 12,
                taxPercent: 18,
                value: 200,
                tax: 36,
                calc: VALUE_TYPE.PERCENTAGE
            }},
        couponCodes: [] // why do we need this ?
    };

    return data; // Return the result
};

export { parseOrder };
