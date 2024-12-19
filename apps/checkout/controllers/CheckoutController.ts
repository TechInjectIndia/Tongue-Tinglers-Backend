import {Request, Response} from "express";
import {get} from "lodash";
import {ParsedOrderItem} from "../../../interfaces/order_items";
import {ParsedOrder} from "../../../interfaces";

export default class checkoutController {

    static getCartDetailByUserId(req: Request, res: Response): Promise<Array<ParsedOrderItem>> {

        const user_id = get(req, "user_id");

        //TODO @sumeet sir implement this
    }


    static getOrderByItems(req: Request, res: Response): Promise<ParsedOrder> {
        //TODO @sumeet sir implement this
    }

    static applyCoupon(req: Request, res: Response): Promise<ParsedOrder> {
        //TODO @sumeet sir implement this
    }


}
