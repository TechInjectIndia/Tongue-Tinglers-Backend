import { BaseMeta } from "apps/common/models/Base";
import { OrderStatus, PAYMENT_TYPE } from "apps/order/interface/Order";
import { IDiscComponent, ParsedOrderItem, PriceComponent } from "apps/order/interface/OrderItem";
import { ParsedUser } from "apps/user/interface/user";
import { Address } from "types";

interface PendingOrderPayload {
    orderId: number;
    status: OrderStatus;
    total: number; // without Tax
    totalTax: number;
    deliveryStatus: string;
    customerDetails: ParsedUser;
    paymentType: PAYMENT_TYPE; //todo convert to enum
    paymentId: number;
    cancelledItems: ParsedOrderItem[];
    discount: Record<string, IDiscComponent>;
    totalDiscount: number;
    deliveryDetails: any; //todo @nitesh convert to interface
    shippingAddress: Address;
    totalShipping: number;
    anomalyArr: number[];
    coupon: string | null;
    items: ParsedOrderItem[];
    price: Record<string, PriceComponent>;
    couponCodes: string[]
}

interface PendingOrder extends PendingOrderPayload, BaseMeta{}

interface ParsedPendingOrder {
    id: number;
    orderId: number;
    status: OrderStatus;
    total: number; // without Tax
    totalTax: number;
    deliveryStatus: string;
    customerDetails: ParsedUser;
    paymentType: PAYMENT_TYPE; //todo convert to enum
    paymentId: number;
    cancelledItems: ParsedOrderItem[];
    discount: Record<string, IDiscComponent>;
    totalDiscount: number;
    deliveryDetails: any; //todo @nitesh convert to interface
    shippingAddress: Address;
    totalShipping: number;
    anomalyArr: number[];
    coupon: string | null;
    items: ParsedOrderItem[];
    price: Record<string, PriceComponent>;
    couponCodes: string[]
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export {PendingOrderPayload, PendingOrder, ParsedPendingOrder}