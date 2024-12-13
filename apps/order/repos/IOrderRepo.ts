import { BaseOrder, Order, OrderPayload } from "../../../interfaces/orders";
export interface IOrderRepo {
    createOrder(order: OrderPayload): Promise<Order | null>;
    updateOrder(order: any): Promise<any>;
    deleteOrder(orderId: number): Promise<any>;
    getOrderById(orderId: number): Promise<Order>;
    getAllOrders(page: number, limit: number, search: string, filters: object): Promise<any>;
}