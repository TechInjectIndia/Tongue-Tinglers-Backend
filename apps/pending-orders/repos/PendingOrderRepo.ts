import {PendingOrderModel} from "../models/PendingOrderTable";
import {IPendingOrderRepo} from "./IPendingOrderRepo";
import {UserModel} from "apps/user/models/UserTable";
import {OrderPayload, ParsedOrder} from "../../order/interface/Order";
import {DTO, getHandledErrorDTO, getSuccessDTO} from "../../common/models/DTO";
import {parseOrder} from "../../order/parser/parseOrder";
import {Transaction} from "sequelize";
import { FranchiseModel } from "apps/franchise/models/FranchiseTable";
import { NotesModel } from "apps/order/models/NotesTable";
import { OrderItemsModel } from "apps/order-items/models/OrderItemsTable";

export class PendingOrderRepo implements IPendingOrderRepo {
   async getPendingOrderByAttributes(payload: any, transaction?: Transaction): Promise<ParsedOrder | null> {
    try {
        const options: any = {
            where: payload,
            include: [
                {
                    model: UserModel,
                    as: "customer"
                },
                {
                    model: FranchiseModel,
                    as: "franchise"
                },
                {
                    model: OrderItemsModel,
                    through: { attributes: [] }, // Exclude the join table from the results
                    as: "orderItems", // Use the alias defined in the association
                },
                {
                    model: UserModel,
                    as: "createdByUser"
                },
                {
                    model: UserModel,
                    as: "deletedByUser"
                },
                {
                    model: UserModel,
                    as: "updatedByUser"
                }
            ],
        };
        // Only add transaction to options if it's provided
        if (transaction) {
            options.transaction = transaction;
        }
        const res = await PendingOrderModel.findOne(options);
        return res ? parseOrder(res.toJSON()) : null;
    } catch(error) {
        console.log(error);
        return null;
    }
}

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
            franchise: 0,
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
