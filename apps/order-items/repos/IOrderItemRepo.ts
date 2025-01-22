import { Transaction } from "sequelize";
import { BaseOrderItem, OrderItem, ORDER_ITEM_TYPE, UpdateQuantity, UpdateStudentDiscount, UpdateCouponDiscount, UpdatePointsDiscount, OrderItemPayload, ParsedOrderItem } from "../interface/orderItem";
import { DTO } from "apps/common/models/DTO";
export interface IOrderItemRepo {

    createOrderItem(orderItem: OrderItemPayload,transaction?:Transaction): Promise<DTO<ParsedOrderItem>>;

    createBulkOrderItem(orderItem: OrderItemPayload[],transaction?:Transaction): Promise<DTO<ParsedOrderItem[]>>

    getOrderItemsById(id: number,transaction?:Transaction): Promise<DTO<ParsedOrderItem>>;
    
    updateOrderItem(id: number, orderItem: OrderItemPayload,transaction?:Transaction): Promise<DTO<ParsedOrderItem>>;
    
    deleteOrderItem(id: number,transaction?:Transaction): Promise<DTO<ParsedOrderItem>>;

    updateQuantity(quantity: UpdateQuantity,transaction?:Transaction): Promise<DTO<ParsedOrderItem>>;

    updateCouponDiscount(coupon_discount: UpdateCouponDiscount,transaction?:Transaction): Promise<DTO<ParsedOrderItem>>;

    updatePointsDiscount(points_discount: UpdatePointsDiscount,transaction?:Transaction): Promise<DTO<ParsedOrderItem>>;

    updateStudentDiscount(student_discount: UpdateStudentDiscount,transaction?:Transaction): Promise<DTO<ParsedOrderItem>>;
}