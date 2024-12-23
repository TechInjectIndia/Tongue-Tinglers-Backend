import {Request, Response} from "express";
import {get} from "lodash";
import {
    ParsedOrder,
    PAYMENT_TYPE,
    PresaleParsedOrder
} from "../../../interfaces";
import {OrderStatus} from "../../../types";


export default class CheckoutController {
    /**
     *
     * @param req
     * @param res {OrderParams}
     * @returns Promise<ParsedOrder>
     *
     *
     */
    static getOrder(req: Request, res: Response) {

        // params verified by Joi Middleware
        const user_id = parseInt(get(req, "user_id"));
        const coupon_code: (string | undefined) = get(req, "coupon_code");
        const shippingAddId = parseInt(get(req, "shippingAddId"));
        const billingAddId = parseInt(get(req, "billingAddId"));
        const order:ParsedOrder = {
            anomalyArr: [],
            cancelledItems: [],
            coupon: "code1",
            createdAt: undefined,
            createdBy: undefined,
            customerDetails: undefined,
            deletedAt: undefined,
            deletedBy: undefined,
            deliveryDetails: undefined,
            deliveryStatus: "",
            id: 0,
            items: [],
            notes: [],
            orderItems: [],
            paymentId: 1,
            paymentType: PAYMENT_TYPE.RP_CHECKOUT,
            shippingAddress: undefined,
            status: OrderStatus.PENDING,
            total: 1000,
            totalDiscount: 20,
            totalShipping: 100,
            totalTax: 500,
            updatedAt: new Date(),
            updatedBy: "Nitesh" as any

        };
        res.status(200).json(order);
    }

    static getPreSaleOrder(req: Request,
        res: Response): Promise<PresaleParsedOrder> {

        const user_id = parseInt(get(req, "user_id"));
        if (user_id === undefined || isNaN(user_id)) {
            res.status(400).json({error: "User not found"});
            return;
        }
    }
}
