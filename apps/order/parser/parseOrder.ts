import {
    BaseOrder,
    DeliveryStatus,
    ORDER_TYPE,
    OrderPayload,
    OrderStatus,
    ParsedNotes,
    ParsedOrder,
    PAYMENT_TYPE
} from "../interface/Order"
import {parseOrderItem} from "../../order-items/parser/parseOrderItem";
import {BaseOrderItem, ORDER_ITEM_TYPE} from "../interface/OrderItem";
import {OrderModel} from "../models/OrderTable";
import {OrderItemsModel} from "../../order-items/models/OrderItemsTable";
import {parseUser, parseUserToMetaUser} from "apps/user/parser/user-parser";
import {parseFranchise} from "apps/franchise/parser/franchiseParser";
import {ParsedUser} from "../../user/interface/user";
import { OrderItemTable } from "apps/order-items/interface/orderItem";
import sortingLogs from "apps/lead/parser/leadParser";


const parseOrder = (order: any): ParsedOrder => {
    let notesLogs=[];
    if((order.notes && Array.isArray(order.notes)) && (order.notes.length > 0)){
        notesLogs = order.notes.flatMap(note => note.logs);
    }
    const data: ParsedOrder = {
        id: order.id,
        status: order.status,
        total: order.total,
        totalTax: order.totalTax,
        deliveryStatus: order.deliveryStatus,
        customerDetails: order.customer ? parseUser(order.customer) : null,
        paymentType: order.paymentType,
        paymentId: order.paymentId,
        cancelledItems: order.cancelledItems,
        totalDiscount: order.totalDiscount,
        deliveryDetails: order.deliveryDetails,
        shippingAddress: order.shippingAddress,
        billingAddress: order.billingAddress,
        totalShipping: order.totalShipping,
        anomalyArr: order.anomalyArr,
        items: order.orderItems.map((item: OrderItemTable) => parseOrderItem(item)),
        price: order.price,
        orderType: order.orderType,
        franchise: order.franchiseData ? parseFranchise(order.franchiseData) : null,
        notes: order.notes && order.notes.length > 0 ? order.notes.map((note) => parseNotes(note)) : [],
        createdBy: order.createdByUser ? parseUserToMetaUser(order.createdByUser) : null,
        updatedBy: order.updatedByUser ? parseUserToMetaUser(order.updatedByUser) : null,
        deletedBy: order.deletedByUser ? parseUserToMetaUser(order.deletedByUser) : null,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        deletedAt: order.deletedAt,
        logs: order.logs ? sortingLogs(order.logs, notesLogs) : null
    };

    return data; // Return the result
};

const parseNotes = (note: any): ParsedNotes => {
    return {
        id: note.id,
        notes: note.notes,
        isNew: note.isNew,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        createdBy: note.createdByUser ? parseUserToMetaUser(note.createdByUser) : null,
        updatedBy: note.updatedByUser ? parseUserToMetaUser(note.updatedByUser) : null,
    };
};

export const parseAndSavePendingOrderToOrder = async (pendingOrder:ParsedOrder): Promise<any> => {
    try {
        const payload = parsedToPayload(pendingOrder);
        // const response = await  OrderItemsModel.bulkCreate(payload.orderItems);
        // const orderInstance = await OrderModel.create(payload);
        // await orderInstance.addOrderItems(response)

    } catch (error) {
        console.error("Error parsing pending order to order:", error);
        throw new Error("Failed to parse pending order to order");
    }
};

export const parsedToPayload=(parsed:any)=>{

    console.log(parsed)
    const dd = parsed.orderItems.map((d)=>{
        const item:BaseOrderItem={
        coupon_discount:0,
        points_discount: 0,
        product_id: d.product_id,
        product_option_id: d.product_option_id.id,
        quantity: d.quantity,
        student_discount: 0,
        total_price: d.total_price,
        total_tax: d.totalTax,
        type: ORDER_ITEM_TYPE.PACKAGING
        }
        return item;
    })
    const payload:OrderPayload={
        anomalyArr: [],
        billingAddress: parsed.billingAddress,
        cancelledItems: [],
        // cancelled_items: [],
        // createdBy: parsed.createdBy.id ,
        // customer_details: parsed.createdBy.id,
        // deletedBy: null,
        // delivery_details: "",
        // delivery_status: "",
        // discount_prices: parsed.discount as unknown as any,
        franchise: null,
        // item_count: dd.length,
        notes: [],
        // orderItems: dd,
        // order_type: ORDER_TYPE.SAMPLE_KIT,
        // payment_id: parsed.paymentId,
        // payment_type: parsed.paymentType,
        // prices: parsed.price as unknown as any,
        shippingAddress: parsed.shippingAddress,
        status: OrderStatus.PENDING,
        total: parsed.total,
        items: [],
        totalTax: 0,
        deliveryStatus: DeliveryStatus.PENDING,
        customerDetails: 0,
        paymentType: PAYMENT_TYPE.RP_CHECKOUT,
        paymentId: "",
        totalDiscount: 0,
        deliveryDetails: undefined,
        totalShipping: 0,
        price: undefined,
        orderType: ORDER_TYPE.RM_ORDER
    }

    return payload;
}


export { parseOrder, parseNotes };
