import {BaseMeta, ParsedMeta} from "../database/schema/base/Base";
import {
    BaseOrderItem,
    ParsedOrderItem,
    PreSaleParsedOrderItem
} from "./order_items";
import {ParsedUser} from "./user";
import {Address} from "../types";

export enum PAYMENT_STATUS {
    PAID = "paid",
    UNPAID = "un-paid",
    PROCESSED = "processed",
}

export enum ORDER_TYPE {
    RM_ORDER = "rm-order",
    SAMPLE_KIT = "sample-kit",
    FRANCHISE = "franchise"
}

interface BaseNotes {
    isNew: boolean,
    notes: string;
    createdBy: number;
}

interface Notes extends BaseNotes {
    id: number;
}

interface BaseOrder {
    status: string;
    item_count: number;
    total: number;
    total_tax: number;
    delivery_status: string;
    // notes: number[];
    customer_details: number;
    payment_type: string;
    payment_id: number | null;
    cancelled_items: number[];
    total_discount: number;
    delivery_details: any | null;
    shippingAddress: Address | null;
    billingAddress: Address | null;
    total_shipping: number;
    anomalyArr: number[]
    prices: string;
    discount_prices: string;
    order_type: ORDER_TYPE
    franchise_id: number | null;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}


interface ParsedOrder extends ParsedMeta, OrderPayload {
    id: number;
    status: string;
    total: number; // without Tax
    totalTax: number;
    deliveryStatus: string;
    customerDetails: ParsedUser;
    paymentType: string; //todo convert to enum
    paymentId: number;
    cancelledItems: ParsedOrderItem[];
    totalDiscount: number;
    deliveryDetails: any; //todo @nitesh convert to interface
    shippingAddress: Address;
    totalShipping: number;
    anomalyArr: number[];
    coupon: string;
    items: ParsedOrderItem[];

}

interface PresaleParsedOrder extends OrderPayload {
    total: number; // without Tax
    totalTax: number;
    cancelledItems: PreSaleParsedOrderItem[];
    totalDiscount: number;
    coupon: string;
    items: PreSaleParsedOrderItem[];
}

interface OrderPayload {
    notes: Notes[];
    orderItems: BaseOrderItem[];
}

interface Order extends BaseMeta, BaseOrder {
    id: number;
}

interface OrderPagination<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export {
    BaseOrder,
    Order,
    BaseNotes,
    Notes,
    OrderPayload,
    OrderPagination,
    ParsedOrder,
    PresaleParsedOrder
}
