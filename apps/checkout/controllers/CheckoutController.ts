import { Request, Response } from "express";
import { get } from "lodash";
import { ParsedOrder, PresaleParsedOrder } from "../../../interfaces";
import { Cart } from "../../../interfaces/cart_products";
import RepoProvider from "../../RepoProvider";
import { DTO } from "../../common/models/DTO";

interface OrderParams {
    userId: string;
    couponCode?: string;
    shippingAddId?: string;
    billingAddId?: string;
}

export default class CheckoutController {
    static getOrder(req: Request, res: Response): Promise<ParsedOrder> {
        const user_id = get(req, "user_id");
        //TODO @sumeet sir implement this
    }

    static async getPreSaleOrder(req: Request, res: Response): Promise<DTO<PresaleParsedOrder>> {
        return RepoProvider.getPreSaleOrderProvider.getPreSaleOrder(get(req, "cart"));

    }
}
