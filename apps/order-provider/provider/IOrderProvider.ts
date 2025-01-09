
import { DTO } from "apps/common/models/DTO";
import { OrderState, ParsedOrder, RPOrder } from "apps/order/interface/Order";

export interface IOrderProvider {
    processOrder(state: OrderState): Promise<DTO<{ rpOrder: RPOrder; parsedOrder: ParsedOrder }>>;
}
