import { getUserName } from "apps/common/utils/commonUtils";
import { ParsedPendingOrder, PendingOrder, PendingOrderPayload } from "../interface/PendingOrder";
import { PendingOrderModel } from "../models/PendingOrderTable";
import { IPendingOrderRepo } from "./IPendingOrderRepo";
import { UserModel } from "apps/user/models/UserTable";
import {ParsedOrder} from "../../order/interface/Order";

export class PendingOrderRepo implements IPendingOrderRepo {
    async create(payload: PendingOrderPayload): Promise<any | null> {
        try{
            const user = await UserModel.findByPk(payload.customerDetails.id);
            if(!user){
                throw new Error(`User with ID ${payload.customerDetails.id} not found.`);
            }
            const pendingOrderCreated = await PendingOrderModel.create({
                orderId: payload.orderId,
                status: payload.status,
                total: payload.total,
                totalTax: payload.totalTax,
                deliveryStatus: payload.deliveryStatus,
                customerDetails: payload.customerDetails,
                paymentType: payload.paymentType,
                paymentId: payload.paymentId,
                cancelledItems: payload.cancelledItems,
                discount: payload.discount,
                totalDiscount: payload.totalDiscount,
                deliveryDetails: payload.deliveryDetails,
                shippingAddress: payload.shippingAddress,
                totalShipping: payload.totalShipping,
                anomalyArr: payload.anomalyArr,
                couponCodes: payload.couponCodes,
                coupon: payload.coupon,
                items: payload.items,
                price: payload.price,
                createdBy: payload.customerDetails.id,
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null
            }, {
                userId: user.id,
                userName: getUserName(user)
            })
            return pendingOrderCreated;
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
            paymentId: order.paymentId ? order.paymentId : null,
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
