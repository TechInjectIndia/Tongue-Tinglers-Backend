import { BaseMeta } from "../database/schema/base/Base"

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

enum ORDER_ITEM_TYPE {
    RETORT = 'retort',
    PACKAGING = 'packaging'
}

interface OrderItem extends BaseOrderItem {
    id: number
}

interface UpdateQuantity extends OrderItem{
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
    UpdateStudentDiscount
}