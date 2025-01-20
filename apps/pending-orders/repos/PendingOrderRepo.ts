import {PendingOrder, PendingOrderModel} from "../models/PendingOrderTable";
import {IPendingOrderRepo} from "./IPendingOrderRepo";
import {UserModel} from "apps/user/models/UserTable";
import {
    ORDER_TYPE,
    OrderPayload,
    ParsedOrder
} from "../../order/interface/Order";
import {DTO, getHandledErrorDTO, getSuccessDTO} from "../../common/models/DTO";
import {parseOrder} from "../../order/parser/parseOrder";
import {Transaction} from "sequelize";
import {OrderItemsModel} from "apps/order-items/models/OrderItemsTable";
import {BaseOrderItem, ORDER_ITEM_TYPE} from "../../order/interface/OrderItem";
import {OptionsValueModel} from "../../optionsValue/models/OptionValueTable";
import RepoProvider from "../../RepoProvider";

export class PendingOrderRepo implements IPendingOrderRepo {
   async getPendingOrderByAttributes(id, transaction?: Transaction): Promise<ParsedOrder | null> {
    try {
        const options: any = {
            where: id,
            include: [
                { model: UserModel, as: "createdByUser" },
                { model: UserModel, as: "deletedByUser" },
                { model: UserModel, as: "updatedByUser" },
            ],
        };
        // Only add transaction to options if it's provided
        if (transaction) {
            options.transaction = transaction;
        }
        const resp = await PendingOrderModel.findOne(options)

        resp.pendingOrderItems = await  Promise.all(resp.pendingOrderItems.map(async (dd) => {
                dd.product_id = dd.product_id;
                dd.product_option_id = await RepoProvider.optionsValueRepo.getById(dd.product_option_id)
            return {
                    ...dd
                  }
        }));

        console.log(resp.toJSON())

        return resp ? parseOrder(resp.toJSON()) : null;
    } catch(error) {
        console.log(error);
        return null;
    }
}

    async create(payload: OrderPayload) : Promise<DTO<PendingOrder>> {
       try {
        // Find user within transaction
        const user = await UserModel.findByPk(payload.customer_details,);
        if (!user) {
            return  getHandledErrorDTO(`User with ID ${payload.customer_details} not found.`);
        }

        const dd = {...payload,pendingOrderItems:payload.orderItems}
        const pendingOrder = await PendingOrderModel.create(dd);

        const resp = await PendingOrderModel.findOne({where:{id:pendingOrder.id},
            include: [
                { model: UserModel, as: "createdByUser" },
                { model: UserModel, as: "deletedByUser" },
                { model: UserModel, as: "updatedByUser" },
            ],})

        return getSuccessDTO(resp.toJSON());

    } catch (error) {
        return getHandledErrorDTO(error.message || "Transaction failed");
    }
   }

    async createPendingOrderPayload(order:ParsedOrder, paymentOrderId:string,userId:number){
        const pendingOrderPayload: OrderPayload = {
            anomalyArr: [],
            billingAddress: order.billingAddress,
            cancelled_items: [],
            createdBy: userId,
            customer_details: userId,
            deletedBy: null,
            delivery_details: order.deliveryDetails,
            delivery_status: "",
            discount_prices: "",
            franchise: null,
            item_count: 0,
            notes: [],
            orderItems: order.items.map((d)=>{const dd:BaseOrderItem={
                coupon_discount: 0,
                points_discount: 0,
                product_id: d.product.id,
                product_option_id: d.productOption.id,
                quantity: d.quantity,
                student_discount: Number(d.totalDiscount),
                total_price: Number(d.total_price),
                total_tax: Number(d.totalTax),
                type: order.orderType===ORDER_TYPE.RM_ORDER?ORDER_ITEM_TYPE.PACKAGING:ORDER_ITEM_TYPE.RETORT
            }
            return dd;
            }),
            order_type: order.orderType??ORDER_TYPE.RM_ORDER,
            payment_id: paymentOrderId,
            payment_type: "",
            prices: "",
            shippingAddress: order.shippingAddress,
            status: order.status,
            total: Number(order.total),
            total_discount: Number(order.totalDiscount),
            total_shipping: Number(order.totalShipping),
            total_tax: Number(order.totalTax),
            updatedBy: null
        };

        console.log("******");
        console.log(pendingOrderPayload);
        console.log("******");
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
