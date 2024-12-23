import {Request, Response} from "express";
import {get} from "lodash";
import {ParsedOrder, PresaleParsedOrder} from "../../../interfaces";


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

    static getPreSaleOrder(req: Request, res: Response): Promise<PresaleParsedOrder> {

        const user_id = get(req, "user_id");
        //TODO @sumeet sir implement this
    }
}
