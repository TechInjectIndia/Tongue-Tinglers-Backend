import { DTO } from "apps/common/models/DTO";
import { OrderState, ParsedOrder, RPOrder } from "apps/order/interface/Order";

export interface IOrderProvider {
    processOrder(
        state: OrderState,
    ): Promise<DTO<{ rpOrder: RPOrder; parsedOrder: ParsedOrder }>>;

    /**
     * called from webhook success case.
     * processes stock, clears cart, moves order to real orders table
     * send mails
     */
    processPostOrder(
        paymentOrderId: string,
        paymentId: string,
    ): Promise<DTO<null>>;
}
