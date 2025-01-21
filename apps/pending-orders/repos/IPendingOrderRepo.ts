
import {
    ORDER_TYPE,
    OrderPayload,
    ParsedOrder
} from "../../order/interface/Order";
import {Transaction} from "sequelize";
import {DTO} from "../../common/models/DTO";
import {PendingOrder} from "../models/PendingOrderTable";

export interface IPendingOrderRepo {
    create(payload: OrderPayload) : Promise<DTO<PendingOrder>>
    deleteAllPendingOrderByOrderId(orderId:number): Promise<any | null>
    getPendingOrderByAttributes(payload:any,transaction?: Transaction):Promise<ParsedOrder|null>;
}
