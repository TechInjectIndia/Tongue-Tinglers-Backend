import { PendingOrder } from "../../pending-orders/interface/PendingOrder";

interface ProcessPostOrderResult {
    order: PendingOrder | null;
    alreadyProcessed: boolean;
}

export { ProcessPostOrderResult };
