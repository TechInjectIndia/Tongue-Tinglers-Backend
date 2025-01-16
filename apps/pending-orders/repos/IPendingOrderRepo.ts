import { ParsedPendingOrder, PendingOrder, PendingOrderPayload } from "../interface/PendingOrder";
import {Order, OrderPayload, ParsedOrder} from "../../order/interface/Order";
import {DTO} from "../../common/models/DTO";

export interface IPendingOrderRepo {
    create(payload: OrderPayload) : Promise<DTO<ParsedOrder>>
    deleteAllPendingOrderByOrderId(orderId:number): Promise<any | null>
    getPendingOrderByAttributes()
}
