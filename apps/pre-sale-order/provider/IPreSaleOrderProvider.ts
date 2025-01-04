import { ParsedCartDetail } from "apps/cart-details/interface/CartDetail";
import { DTO } from "../../common/models/DTO";
import { PresaleParsedOrder } from "apps/order/interface/Order";

export interface IPreSaleOrderProvider {
    getPreSaleOrder(payload: ParsedCartDetail): Promise<DTO<PresaleParsedOrder>>;
}
