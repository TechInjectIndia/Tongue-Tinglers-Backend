
import { DTO } from "apps/common/models/DTO";
import {
    Order, OrderPagination,
    OrderPayload,
    OrderState,
    ParsedOrder,
    RPOrder
} from "../interface/Order";
import {ProcessPostOrderResult} from "../interface/ProcessPostOrderResult";
import {Transaction} from "sequelize";
import {OrderModel} from "../models/OrderTable";
export interface IOrderRepo {
    // createOrder(order: OrderPayload): Promise<Order | null>;
    createOrder(
        order: OrderPayload,
        transaction?: Transaction
    ): Promise<DTO<ParsedOrder | null>>
    // updateOrder(order: any): Promise<any>;
    // createOrder(order: OrderPayload): Promise<Order | null>
    updateOrder(orderId:number, order: OrderPayload, userId:number, transaction?: Transaction): Promise<DTO<ParsedOrder | null>>;
    deleteOrder(orderId: number): Promise<DTO<ParsedOrder | null>>;
    getAllOrders(
        page: number,
        limit: number,
        search: string,
        filters: Record<string, any>,
        transaction?: Transaction
    ): Promise<DTO<OrderPagination<ParsedOrder>>>;

    processOrder(
        state: OrderState,
    ): Promise<DTO<{ rpOrder: RPOrder; parsedOrder: ParsedOrder }>>

    getOrderById(orderId: number): Promise<DTO<ParsedOrder>>;
    // getAllOrders(page: number, limit: number, search: string, filters: object): Promise<any>;

    getOrdersByUser(userId: number): Promise<ParsedOrder[]>

    proceedToPayment(state: OrderState,userId:number): Promise<DTO<{ rpOrder: RPOrder; parsedOrder: ParsedOrder }>>

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
