import { BaseMeta } from "apps/common/models/Base";
import { ParsedFranchise } from "apps/franchise/interface/Franchise";
import { OrderItemPayload } from "apps/order-items/interface/orderItem";
import { BaseOrder, DeliveryStatus, Notes, ORDER_TYPE, OrderStatus, PAYMENT_TYPE } from "apps/order/interface/Order";
import { ParsedOrderItem, PriceComponent } from "apps/order/interface/OrderItem";
import { MetaUser, ParsedCustomer } from "apps/user/interface/user";
import { BaseAddress } from "types";

interface BasePendingOrder{
    status: OrderStatus,
    total: number,
    totalTax: number,
    deliveryStatus: DeliveryStatus,
    customerDetails: number,
    paymentType: PAYMENT_TYPE,
    paymentId: string,
    cancelledItems: number[] | null,
    totalDiscount: number,
    deliveryDetails: any | null,
    shippingAddress: BaseAddress | null,
    billingAddress: BaseAddress | null,
    totalShipping: number,
    anomalyArr: number[] | null,
    price: Record<string, string | number>,
    orderType: ORDER_TYPE,
    franchise: number | null,
    notes: Notes[],
}

interface PendingOrderPayload extends BasePendingOrder {
    items: OrderItemPayload[]
}

interface PendingOrderTable extends BasePendingOrder, BaseMeta {}

interface ParsedPendingOrder {
    id: number,
    status: OrderStatus,
    total: number,
    totalTax:number,
    deliveryStatus: DeliveryStatus,
    customerDetails: ParsedCustomer,
    paymentType: PAYMENT_TYPE,
    paymentId: string,
    cancelledItems: ParsedOrderItem[] | null,
    totalDiscount: number,
    deliveryDetails: any,
    shippingAddress: BaseAddress,
    billingAddress: BaseAddress,
    totalShipping: number,
    anomalyArr: number[],
    items: ParsedOrderItem[],
    price: Record<string, PriceComponent>,
    orderType: ORDER_TYPE,
    franchise: ParsedFranchise | null,
    notes: Notes[] | null,
    createdBy: MetaUser,
    updatedBy: MetaUser | null,
    deletedBy: MetaUser | null,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
    logs: any[] | null
}

export {BasePendingOrder, PendingOrderPayload, PendingOrderTable, ParsedPendingOrder}