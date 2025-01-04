import { Request, Response } from "express";
import { get } from "lodash";

// import { OrderStatus } from "../../../types";
import {
    DeliveryStatus,
    OrderStatus,
    ParsedOrder,
    PAYMENT_TYPE,
    PresaleParsedOrder
} from "apps/order/interface/Order";
import { CartDetailRepo } from "apps/cart-details/repos/cartDetailRepo";
import {USER_STATUS, USER_TYPE} from "../../user/interface/user";


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
        const order: ParsedOrder = {
            couponCodes: [], discount: undefined, price: undefined,
            anomalyArr: [],
            cancelledItems: [],
            coupon: "code1",
            createdAt: new Date(),
            createdBy: 1,
            customerDetails: {
                id: 1,
                firstName: "Admin",
                lastName: "Tongue Tingler",
                email: "",
                phoneNumber: "",
                type: USER_TYPE.ADMIN,
                status: USER_STATUS.ACTIVE,
                role: 0,
                createdBy: 1,
                updatedBy: null,
                deletedBy: null,
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null
            },
            deletedAt: null,
            deletedBy: null,
            deliveryDetails: null,
            deliveryStatus: DeliveryStatus.PENDING,
            id: 1,
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
            updatedBy: 1

        };
        res.status(200).json(order);
    }

    static async getPreSaleOrder(req: Request, res: Response): Promise<PresaleParsedOrder> {

        const user_id = parseInt(get(req, "user_id"));
        if (user_id === undefined || isNaN(user_id)) {
            res.status(400).json({ error: "User not found" });
            return;
        }
        let data = new CartDetailRepo().getCartDetailByUserId(user_id);

    }
}
