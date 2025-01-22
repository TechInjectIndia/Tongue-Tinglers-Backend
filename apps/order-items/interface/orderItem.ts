import { BaseMeta, ParsedMeta } from "apps/common/models/Base";
import { PreSaleParsedOrderItem } from "apps/order/interface/OrderItem";
import { ParsedProduct, PRODUCTS_TYPE } from "apps/product/interface/Product";
import { ParsedVariations } from "apps/product/interface/ProductOptions";
import { MetaUser, ParsedUser } from "apps/user/interface/user";

interface BaseOrderItem {
    product_id: number,
    product_option_id: number,
    quantity: number,
    total_price: number,
    total_tax: number,
    coupon_discount: number,
    points_discount: number,
    student_discount: number,
    type: ORDER_ITEM_TYPE
}

// interface ParsedOrderItem extends PreSaleParsedOrderItem {
//     id: number;
// }

enum ORDER_ITEM_TYPE {
    RETORT = 'retort',
    PACKAGING = 'packaging'
}

interface OrderItem extends BaseOrderItem, ParsedMeta {
    id: number
}

interface UpdateQuantity extends OrderItem {
    quantity: number
}

interface UpdateCouponDiscount extends OrderItem {
    coupon_discount: number
}

interface UpdatePointsDiscount extends OrderItem {
    points_discount: number
}

interface UpdateStudentDiscount extends OrderItem {
    student_discount: number
}

interface OrderItemPayload {
    orderId: number,
    product: number,
    variation: number,
    quantity: number,
    price: Record<string, string | number>,
    totalPrice: number,
    totalTax: number,
    couponDiscount: number,
    type: PRODUCTS_TYPE 
}

interface OrderItemTable extends OrderItemPayload, BaseMeta {}

interface ParsedOrderItem {
    id: number,
    variation: ParsedVariations,
    quantity: number,
    price: Record<string, string | number>,
    totalPrice: number,
    totalTax: number,
    couponDiscount: number,
    type: PRODUCTS_TYPE,
    createdBy: MetaUser,
    updatedBy: MetaUser | null,
    deletedBy: MetaUser | null,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}
export {
    OrderItem,
    BaseOrderItem,
    ORDER_ITEM_TYPE,
    UpdateQuantity,
    UpdateCouponDiscount,
    UpdatePointsDiscount,
    UpdateStudentDiscount,
    ParsedOrderItem,
    PreSaleParsedOrderItem,
    OrderItemTable,
    OrderItemPayload
}
