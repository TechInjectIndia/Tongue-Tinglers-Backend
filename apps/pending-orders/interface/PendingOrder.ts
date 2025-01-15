import { BaseMeta } from "apps/common/models/Base";
import { OrderStatus, PAYMENT_TYPE } from "apps/order/interface/Order";
import {
    IDiscComponent,
    ParsedOrderItem,
    PriceComponent,
} from "apps/order/interface/OrderItem";
import { ParsedUser } from "apps/user/interface/user";
import { Address } from "types";

//todo @Sumeet handle this on the TABLE and MODELS layer
interface AnomalyOrderItem {
    id: number;
    quantity: number;
}

interface PendingOrderPayload {
    orderId: number;
    status: OrderStatus;
    total: number; // without Tax
    totalTax: number;
    deliveryStatus: string;
    customerDetails: ParsedUser;
    paymentType: PAYMENT_TYPE; //todo convert to enum
    paymentId: string;
    paymentOrderId: string;
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
    couponCodes: string[];
    anomalies: AnomalyOrderItem[];
}

interface PendingOrder extends PendingOrderPayload, BaseMeta {}

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
    paymentOrderId: string;
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
    couponCodes: string[];
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export {
    PendingOrderPayload,
    PendingOrder,
    ParsedPendingOrder,
    AnomalyOrderItem,
};
