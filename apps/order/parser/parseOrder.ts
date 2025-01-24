import {
    BaseOrder,
    ORDER_TYPE,
    OrderPayload,
    ParsedOrder,
} from "../interface/Order";
import { parseOrderItem } from "../../order-items/parser/parseOrderItem";
import { BaseOrderItem, ORDER_ITEM_TYPE } from "../interface/OrderItem";
import { OrderModel } from "../models/OrderTable";
import { OrderItemsModel } from "../../order-items/models/OrderItemsTable";
import { parseUserToMetaUser } from "apps/user/parser/user-parser";
import { parseFranchise } from "apps/franchise/parser/franchiseParser";
import { ParsedUser } from "../../user/interface/user";
import { sendMail } from "libraries/resend";
import { OrderMail } from "static/views/email/get-templates/OrderMail";

const parseOrder = (order: any): ParsedOrder => {
    let productVariations: any;

    if (order.orderItems) {
        productVariations = order.orderItems;
    } else if (order.pendingOrderItems) {
        productVariations = order.pendingOrderItems;
    }
    const data: ParsedOrder = {
        anomalyArr: [],
        billingAddress: order.billingAddress,
        cancelledItems: [],
        coupon: "",
        couponCodes: [],
        createdAt: order.created_at,
        createdBy: order.createdByUser
            ? parseUserToMetaUser(order.createdByUser)
            : null,
        customerDetails: order.createdByUser as unknown as ParsedUser,
        deletedAt: order.deletedAt,
        deletedBy: order.deletedByUser
            ? parseUserToMetaUser(order.deletedByUser)
            : null,
        deliveryDetails: order.delivery_details,
        deliveryStatus: order.delivery_status,
        discount: null,
        id: order.id,
        items: [],
        notes: [],
        orderItems: productVariations,
        paymentId: order.payment_id,
        paymentType: order.payment_type,
        price: order.prices,
        shippingAddress: order.shippingAddress,
        status: order.status,
        total: order.total,
        totalDiscount: order.total_discount,
        totalShipping: order.total_shipping,
        totalTax: order.total_tax,
        updatedAt: order.updatedAt,
        updatedBy: order.updatedByUser
            ? parseUserToMetaUser(order.updatedByUser)
            : null,
        orderType: order.orderType,
        franchise: order.franchise ? parseFranchise(order.franchise) : null,
    };

    return data; // Return the result
};

// const parseOrder = async (order: any): Promise<ParsedOrder> => {
//     // console.log('order.orderItems: ', order.orderItems);
//     const customerDetails = await UserModel.findOne(({where: {id: order.customer_details},attributes:['id', 'firstName', 'lastName','email']}))
//     console.log('customerDetails: ', customerDetails);
//     // Use await inside map to ensure promises are resolved
//     const productVariations = await Promise.all(
//         order.orderItems.map(async (orderItem: any) => {// Await the parseOrderItem result
//             return await parseOrderItem(orderItem); // Ensure to return the parsed item
//         })
//     );

//     const data: ParsedOrder = {
//         anomalyArr: [],
//         billingAddress: undefined,
//         cancelledItems: [],
//         coupon: "",
//         couponCodes: [],
//         createdAt: order.created_at,
//         createdBy: order.createdBy,
//         customerDetails: customerDetails as unknown as ParsedUser,
//         deletedAt: order.deletedAt,
//         deletedBy: order.deletedBy,
//         deliveryDetails: null,
//         deliveryStatus: "",
//         discount: null,
//         id: 0,
//         items: [],
//         notes: [],
//         orderItems: productVariations, // Now populated with the resolved values
//         paymentId: 0,
//         paymentType: null,
//         price: order.price,
//         shippingAddress: order.shippingAddress,
//         status: order.status,
//         total: 0,
//         totalDiscount: 0,
//         totalShipping: 0,
//         totalTax: 0,
//         updatedAt: order.updatedAt,
//         updatedBy: order.updatedBy,
//     };

//     return data; // Return the result
// };

export const parseAndSavePendingOrderToOrder = async (
    pendingOrder: ParsedOrder,
): Promise<any> => {
    try {
        const payload = parsedToPayload(pendingOrder);
        const response = await OrderItemsModel.bulkCreate(payload.orderItems);
        const orderInstance = await OrderModel.create(payload);
        await orderInstance.addOrderItems(response);

        let obj = new OrderMail();

        console.log(pendingOrder)
        console.log("pending order")

        const dto = await obj.getPayload(
            { order: pendingOrder },
            pendingOrder.customerDetails.email,
        );

        console.log("5467890")
        console.log(dto)
        console.log("465789")
        const resp = await sendMail(dto);

        console.log(resp)
    } catch (error) {
        console.error("Error parsing pending order to order:", error);
        throw new Error("Failed to parse pending order to order");
    }
};

export const parsedToPayload = (parsed: any) => {
    console.log(parsed);
    const dd = parsed.orderItems.map((d) => {
        const item: BaseOrderItem = {
            coupon_discount: 0,
            points_discount: 0,
            product_id: d.product_id,
            product_option_id: d.product_option_id.id,
            quantity: d.quantity,
            student_discount: 0,
            total_price: d.total_price,
            total_tax: d.totalTax,
            type: ORDER_ITEM_TYPE.PACKAGING,
        };
        return item;
    });
    const payload: OrderPayload = {
        anomalyArr: [],
        billingAddress: parsed.billingAddress,
        cancelled_items: [],
        createdBy: parsed.createdBy.id,
        customer_details: parsed.createdBy.id,
        deletedBy: null,
        delivery_details: "",
        delivery_status: "",
        discount_prices: parsed.discount as unknown as any,
        franchise: null,
        item_count: dd.length,
        notes: [],
        orderItems: dd,
        order_type: ORDER_TYPE.SAMPLE_KIT,
        payment_id: parsed.paymentId,
        payment_type: parsed.paymentType,
        prices: parsed.price as unknown as any,
        shippingAddress: parsed.shippingAddress,
        status: "pending",
        total: parsed.total,
        total_discount: parsed.totalDiscount,
        total_shipping: parsed.totalShipping,
        total_tax: parsed.totalTax,
        updatedBy: null,
    };

    return payload;
};

export { parseOrder };
