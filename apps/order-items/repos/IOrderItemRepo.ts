import { BaseOrderItem, OrderItem, ORDER_ITEM_TYPE, UpdateQuantity, UpdateStudentDiscount, UpdateCouponDiscount, UpdatePointsDiscount } from "../interface/orderItem";
export interface IOrderItemRepo {

    createOrderItem(orderItem: BaseOrderItem): Promise<OrderItem>;

    createBulkOrderItem(orderItem: BaseOrderItem[]): Promise<OrderItem[]>

    getOrderItemsById(id: number): Promise<OrderItem>;
    
    updateOrderItem(orderItem: OrderItem): Promise<OrderItem>;
    
    deleteOrderItem(id: number): Promise<OrderItem>;

    updateQuantity(quantity: UpdateQuantity): Promise<OrderItem>;

    updateCouponDiscount(coupon_discount: UpdateCouponDiscount): Promise<OrderItem>;

    updatePointsDiscount(points_discount: UpdatePointsDiscount): Promise<OrderItem>;

    updateStudentDiscount(student_discount: UpdateStudentDiscount): Promise<OrderItem>;
}