
import {
    ParsedOrder
} from "../../order/interface/Order";
import {Transaction} from "sequelize";
import {DTO} from "../../common/models/DTO";
import { PendingOrderPayload } from "../interface/PendingOrder";

export interface IPendingOrderRepo {

    create(payload: PendingOrderPayload, userId: number, transaction?: Transaction) : Promise<DTO<ParsedOrder>>
    deleteAllPendingOrderByOrderId(orderId:number, transaction?: Transaction): Promise<DTO<ParsedOrder>>
    getPendingOrderByAttributes(payload:any,transaction?: Transaction):Promise<DTO<ParsedOrder>>;

}
