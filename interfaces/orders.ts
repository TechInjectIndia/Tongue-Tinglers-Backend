import { BaseMeta } from "../database/schema/base/Base";

export enum PAYMENT_STATUS {
    PAID = "paid",
    UNPAID = "un-paid",
    PROCESSED = "processed",
}

export enum ORDER_TYPE {
    FRANCHISE = "franchise",
    SAMPLE_ORDER = "sample-order",
}

interface BaseNotes {
    isNew:boolean,
    notes: string;
    createdBy: number;
}

interface Notes extends BaseNotes{
    id: number;
}

interface BaseOrder {
    order_items: number[];
    status: string;
    item_count: number;
    total: number;
    total_tax: number;
    delivery_status: string;
    // notes: number[];
    customer_details: number;
    payment_type: string;
    payment_id: number;
    cancelled_items: number;
    total_discount: number;
    delivery_details: number;
    total_shipping: number;
    anomalyArr: number[]
    prices: string;
    discount_prices: string;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}

interface OrderPayload extends BaseOrder {
    notes: Notes[];
}
interface Order extends BaseMeta, BaseOrder {
    id: number;
}

interface Pagination<T> {
    page: number;
    limit: number;
    total: number;
    data: T[];
}

export {
    BaseOrder,
    Order,
    BaseNotes,
    Notes,
    OrderPayload,
    Pagination
}