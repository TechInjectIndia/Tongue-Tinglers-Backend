import { Cart } from "../../../interfaces/cart_products";
import { PresaleParsedOrder } from "../../../interfaces/orders";
import { DTO } from "../../common/models/DTO";

export interface IPreSaleOrderProvider {
    getPreSaleOrder(payload: Cart): Promise<DTO<PresaleParsedOrder>>;
}
