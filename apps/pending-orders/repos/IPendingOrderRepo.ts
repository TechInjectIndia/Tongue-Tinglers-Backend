import { ParsedPendingOrder, PendingOrder, PendingOrderPayload } from "../interface/PendingOrder";

export interface IPendingOrderRepo {
    create(payload: PendingOrderPayload): Promise<any | null>
}