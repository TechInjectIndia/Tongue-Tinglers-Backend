import {Request, Response} from "express";
import {get} from "lodash";

// import { OrderStatus } from "../../../types";
import {
    DeliveryStatus,
    ORDER_TYPE,
    OrderStatus,
    ParsedOrder,
    PAYMENT_TYPE,
    PresaleParsedOrder
} from "apps/order/interface/Order";
import {CartDetailRepo} from "apps/cart-details/repos/cartDetailRepo";
import {USER_STATUS, USER_TYPE} from "../../user/interface/user";
import {FRANCHISE_STATUS} from "../../franchise/interface/Franchise";


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
            franchise: {
                id: 0,
                pocName: "",
                pocEmail: "",
                pocPhoneNumber: "",
                users: [],
                region: undefined,
                area: "",
                agreementIds: [],
                paymentIds: [],
                organization: undefined,
                status: FRANCHISE_STATUS.Active,
                establishedDate: undefined,
                affiliate: undefined,
                location: undefined,
                sm: [],
                assignedUser: undefined,
                createdBy: 0,
                updatedBy: 0,
                deletedBy: 0,
                createdAt: undefined,
                updatedAt: undefined,
                deletedAt: undefined,
                commissionMap: []
            },
            orderType: ORDER_TYPE.RM_ORDER,
            couponCodes: [], discount: undefined, price: undefined,
            anomalyArr: [],
            cancelledItems: [],
            coupon: "code1",
            createdAt: new Date(),
            createdBy: 1,
            customerDetails: {
                id: 0,
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                type: USER_TYPE.ADMIN,
                status: USER_STATUS.ACTIVE,
                role: 0,
                profilePhoto: "",
                createdBy: 0,
                updatedBy: 0,
                deletedBy: 0,
                createdAt: undefined,
                updatedAt: undefined,
                deletedAt: undefined
            },
            deletedAt: null,
            deletedBy: null,
            deliveryDetails: null,
            deliveryStatus: DeliveryStatus.PENDING,
            id: 1,
            items: [],
            notes: [],
            orderItems: [],
            paymentId: '',
            paymentType: PAYMENT_TYPE.RP_CHECKOUT,
            shippingAddress: null,
            billingAddress: null,
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
