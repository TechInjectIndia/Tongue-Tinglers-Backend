import { Address } from "apps/address/interface/Address";
import { BaseMeta, ParsedMeta } from "apps/common/models/Base";
import { ParsedCustomer, ParsedUser } from "apps/user/interface/user";
import { BaseOrderItem, IDiscComponent, ParsedOrderItem, PreSaleParsedOrderItem, PriceComponent } from "./OrderItem";
import { ParsedFranchise } from "apps/franchise/interface/Franchise";


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
    payment_id: string | null;
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

  //todo update
export enum DeliveryStatus {
    PENDING = 'PENDING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    RTO = 'RTO'

  }

interface ParsedOrder extends ParsedMeta, OrderPayload {
    id: number;
    status: OrderStatus;
    total: number; // without Tax
    totalTax: number;
    deliveryStatus: string;
    customerDetails: ParsedCustomer;
    paymentType: PAYMENT_TYPE; //todo convert to enum
    paymentId: number;
    cancelledItems: ParsedOrderItem[];
    discount: Record<string, IDiscComponent>;
    totalDiscount: number;
    deliveryDetails: any; //todo @nitesh convert to interface
    shippingAddress: Address;
    billingAddress: Address;
    totalShipping: number;
    anomalyArr: number[];
    coupon: string | null;
    items: ParsedOrderItem[];
    price: Record<string, PriceComponent>;
    couponCodes: string[]
    orderType: ORDER_TYPE
    franchise: ParsedFranchise
}

interface PresaleParsedOrder extends OrderPayload {
    total: number; // without Tax
    totalTax: number;
    cancelledItems: PreSaleParsedOrderItem[];
    totalDiscount: number;
    coupon: string | null;
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
    userId: number;
    billingAddressId: number | null;
    shippingAddressId: number | null;
    paymentType:PAYMENT_TYPE
}

enum RP_ORDER_STATUS {
    PAID = "paid",
    CREATED = "created",
    ATTEMPTED = "attempted",
}

export enum ORDER_CURRENCY {
    INR = "INR",
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
;

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
