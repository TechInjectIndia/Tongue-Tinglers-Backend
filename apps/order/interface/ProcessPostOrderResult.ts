import {Order, ParsedOrder} from "./Order";

interface ProcessPostOrderResult {
    order: ParsedOrder | null;
    alreadyProcessed: boolean;
}

export { ProcessPostOrderResult };
