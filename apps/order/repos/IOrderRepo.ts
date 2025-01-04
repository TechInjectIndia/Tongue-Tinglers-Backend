import { DTO } from "apps/DTO/DTO";
import { BaseOrder, Order, OrderPayload } from "../../../interfaces/orders";
import { OrderState, ParsedOrder, RPOrder } from "../interface/Order";
export interface IOrderRepo {
    createOrder(order: OrderPayload): Promise<Order | null>;
    updateOrder(order: any): Promise<any>;
    deleteOrder(orderId: number): Promise<any>;
    getOrderById(orderId: number): Promise<Order>;
    getAllOrders(page: number, limit: number, search: string, filters: object): Promise<any>;
    processOrder(state: OrderState):Promise<DTO<{rpOrder: RPOrder, parsedOrder:ParsedOrder}>>;
    proceedToPayment(state: OrderState): Promise<{rpOrder: RPOrder, parsedOrder:ParsedOrder}>;
    getOrdersByUser(userId: number): Promise<ParsedOrder[]>
}