import {PendingOrderPayload} from "../interface/PendingOrder";
import {PendingOrderModel} from "../models/PendingOrderTable";
import {IPendingOrderRepo} from "./IPendingOrderRepo";
import {UserModel} from "apps/user/models/UserTable";
import {Order, OrderPayload, ParsedOrder} from "../../order/interface/Order";
import {DTO, getSuccessDTO} from "../../common/models/DTO";
import {parseOrder} from "../../order/parser/parseOrder";

export class PendingOrderRepo implements IPendingOrderRepo {
    async create(payload: OrderPayload) : Promise<DTO<ParsedOrder>> {
        try{
            const user = await UserModel.findByPk(payload.customer_details);
            if(!user){
                throw new Error(`User with ID ${payload.customer_details} not found.`);
            }
            const res =  await PendingOrderModel.create(payload);
            return res? getSuccessDTO(parseOrder(res.toJSON())):get;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async createPendigOrderPayload(order:ParsedOrder, paymentOrderId:string){
        const pendingOrderPayload: PendingOrderPayload = {
            orderId: order.id,
            anomalies:[],
            anomalyArr: order.anomalyArr ? order.anomalyArr : [],
            cancelledItems: order.cancelledItems ? order.cancelledItems : [],
            coupon: order.coupon ? order.coupon : null,
            couponCodes: order.couponCodes ? order.couponCodes : [],
            customerDetails: order.customerDetails ? order.customerDetails : null,
            deliveryDetails: order.deliveryDetails ? order.deliveryDetails : null,
            deliveryStatus: order.deliveryStatus ? order.deliveryStatus : null,
            discount: order.discount ? order.discount : null,
            items: order.items ? order.items : [],
            paymentId: paymentOrderId ? paymentOrderId : null,
            paymentType: order.paymentType ? order.paymentType : null,
            price: order.price ? order.price : null,
            shippingAddress: order.shippingAddress ? order.shippingAddress : null,
            status: order.status ? order.status : null,
            total: order.total ? order.total : null,
            totalDiscount: order.totalDiscount ? order.totalDiscount : null,
            totalShipping: order.totalShipping ? order.totalShipping : null,
            totalTax: order.totalTax ? order.totalTax : null,
            paymentOrderId,
        };
        return pendingOrderPayload;
    }

    async deleteAllPendingOrderByOrderId(orderId:number){
        try{
            const pendingOrder = await PendingOrderModel.destroy({
                where: {
                    orderId: orderId
                }
            });
            return pendingOrder;
        }catch(error){
            console.log(error);
            return null;
        }
    }
}
