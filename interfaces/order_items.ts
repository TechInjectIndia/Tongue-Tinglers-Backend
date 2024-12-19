import {BaseMeta, ParsedMeta} from "../database/schema/base/Base"
import {ParsedProductOptions} from "./product-options";
import {ParsedProduct} from "./products";

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

interface PriceComponent {
}

interface PreSaleParsedOrderItem {

    product: ParsedProduct,
    productOptionId: ParsedProductOptions,
    quantity: number,
    total_price: number,
    totalTax: number,
    prices: Array<PriceComponent>
    disc: Array<PriceComponent>
    type: ORDER_ITEM_TYPE
    // order_items?: ParsedOrderItem[];
}

interface ParsedOrderItem extends PreSaleParsedOrderItem {
    id: number;
}

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

export {
    OrderItem,
    BaseOrderItem,
    ORDER_ITEM_TYPE,
    UpdateQuantity,
    UpdateCouponDiscount,
    UpdatePointsDiscount,
    UpdateStudentDiscount,
    ParsedOrderItem,
    PriceComponent,
    PreSaleParsedOrderItem
}
