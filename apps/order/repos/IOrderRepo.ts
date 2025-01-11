
import { DTO } from "apps/common/models/DTO";
import {
    Order,
    OrderPayload,
    OrderState,
    ParsedOrder,
    RPOrder
} from "../interface/Order";
import {ProcessPostOrderResult} from "../interface/ProcessPostOrderResult";
export interface IOrderRepo {
    // createOrder(order: OrderPayload): Promise<Order | null>;
    updateOrder(order: any): Promise<any>;
    deleteOrder(orderId: number): Promise<any>;
    getOrderById(orderId: number): Promise<Order>;
    getAllOrders(page: number, limit: number, search: string, filters: object): Promise<any>;
    processOrder(state: OrderState):Promise<DTO<{rpOrder: RPOrder, parsedOrder:ParsedOrder}>>;
    proceedToPayment(state: OrderState): Promise<{rpOrder: RPOrder, parsedOrder:ParsedOrder}>;
    getOrdersByUser(userId: number): Promise<ParsedOrder[]>

    /**
     * DB Transaction
     * 1. get pending Order from db
     * 2. check if already not processed
     * 3. process Stock
     * 4. clear cart
     * 5. save payment in the paymentsTable
     * 6. assigning new id, and save to orders table
     * 7. update the pending order
     */
    processPostOrderTransaction(paymentOrderId:string):Promise<DTO<ProcessPostOrderResult>>;
}
