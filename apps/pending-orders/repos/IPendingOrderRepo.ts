import { ParsedPendingOrder, PendingOrder, PendingOrderPayload } from "../interface/PendingOrder";
import {Order, OrderPayload} from "../../order/interface/Order";
import {DTO} from "../../common/models/DTO";

export interface IPendingOrderRepo {
    create(payload: OrderPayload) : Promise<DTO<Order>>;
    deleteAllPendingOrderByOrderId(orderId:number): Promise<any | null>
}
