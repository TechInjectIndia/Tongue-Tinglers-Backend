import { PendingOrder } from "../../pending-orders/interface/PendingOrder";
import {Order} from "./Order";

interface ProcessPostOrderResult {
    order: Order | null;
    alreadyProcessed: boolean;
}

export { ProcessPostOrderResult };
