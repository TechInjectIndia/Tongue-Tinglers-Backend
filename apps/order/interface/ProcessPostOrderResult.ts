import { PendingOrder } from "../../pending-orders/interface/PendingOrder";

interface ProcessPostOrderResult {
    pendingOrder: PendingOrder | null;
    alreadyProcessed: boolean;
}

export { ProcessPostOrderResult };
