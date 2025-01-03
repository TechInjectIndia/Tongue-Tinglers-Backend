import { ParsedCartDetail } from "apps/cart-details/interface/cartDetail";
import { Cart } from "../../../interfaces/cart_products";
// import { PresaleParsedOrder } from "../../../interfaces/orders";
import { DTO } from "../../common/models/DTO";
import { PresaleParsedOrder } from "apps/order/interface/Order";

export interface IPreSaleOrderProvider {
    getPreSaleOrder(payload: ParsedCartDetail): Promise<DTO<PresaleParsedOrder>>;
}
