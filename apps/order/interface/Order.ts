import { Address } from "apps/address/interface/Address";
import { BaseMeta, ParsedMeta } from "apps/common/models/Base";
import { ParsedUser } from "apps/user/interface/user";
import { BaseOrderItem, ParsedOrderItem, PreSaleParsedOrderItem } from "./OrderItem";


export enum PAYMENT_STATUS {
    PAID = "paid",
    UNPAID = "un-paid",
    PROCESSED = "processed",
}

export enum PAYMENT_TYPE {
    RP_CHECKOUT = "RP-Checkout",
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
    updatedBy: number | null;
    deletedBy: number | null;
}

export enum OrderStatus {
    PROCESSED = 'Processed',
    PENDING = 'Pending',
    CANCELED = 'Canceled',
  }

interface ParsedOrder extends ParsedMeta, OrderPayload {
    id: number;
    status: OrderStatus;
    total: number; // without Tax
    totalTax: number;
    deliveryStatus: string;
    customerDetails: ParsedUser;
    paymentType: PAYMENT_TYPE; //todo convert to enum
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

interface OrderParams {
    userId: string;
    couponCode?: string;
    shippingAddId: number;
    billingAddId: number;
}

interface OrderState {
    cartId: number;
    userId: number;
    billingAddressId: number;
    shippingAddressId: number;
}

enum RP_ORDER_STATUS {
    PAID = "paid",
    CREATED = "created",
    ATTEMPTED = "attempted",
}

interface RPOrder {
    id: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string; // Shrey System Order Id
    offer_id: string;
    status: RP_ORDER_STATUS;
    attempts: number;
    notes: string[];
    created_at: Date;
}

export {
    BaseOrder,
    Order,
    BaseNotes,
    Notes,
    OrderPayload,
    OrderPagination,
    ParsedOrder,
    PresaleParsedOrder,
    OrderParams,
    OrderState,
    RPOrder,
    RP_ORDER_STATUS
}
