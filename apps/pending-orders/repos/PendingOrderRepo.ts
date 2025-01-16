import {PendingOrderModel} from "../models/PendingOrderTable";
import {IPendingOrderRepo} from "./IPendingOrderRepo";
import {UserModel} from "apps/user/models/UserTable";
import {OrderPayload, ParsedOrder} from "../../order/interface/Order";
import {DTO, getHandledErrorDTO, getSuccessDTO} from "../../common/models/DTO";
import {parseOrder} from "../../order/parser/parseOrder";

export class PendingOrderRepo implements IPendingOrderRepo {
    async create(payload: OrderPayload) : Promise<DTO<ParsedOrder>> {
        try{
            const user = await UserModel.findByPk(payload.customer_details);
            if(!user){
                getHandledErrorDTO(`User with ID ${payload.customer_details} not found.`);
            }
            const res =  await PendingOrderModel.create(payload);
            return res? getSuccessDTO(parseOrder(res.toJSON())):getHandledErrorDTO("not found");
        }catch(error){
            console.log(error);
            getHandledErrorDTO("not found");
        }
    }

    async createPendingOrderPayload(order:ParsedOrder, paymentOrderId:string){
        const pendingOrderPayload: OrderPayload = {
            anomalyArr: [],
            billingAddress: order.billingAddress,
            cancelled_items: [],
            createdBy: 0,
            customer_details: 0,
            deletedBy: 0,
            delivery_details: order.deliveryDetails,
            delivery_status: "",
            discount_prices: "",
            franchise_id: 0,
            item_count: 0,
            notes: [],
            orderItems: [],
            order_type: order.orderType,
            payment_id: "",
            payment_type: "",
            prices: "",
            shippingAddress: order.shippingAddress,
            status: "",
            total: 0,
            total_discount: 0,
            total_shipping: 0,
            total_tax: 0,
            updatedBy: 0
        };
        return pendingOrderPayload;
    }

    async deleteAllPendingOrderByOrderId(id:number){
        try{
            return await PendingOrderModel.destroy({
                where: {
                    id
                }
            });
        }catch(error){
            console.log(error);
            return null;
        }
    }
}
