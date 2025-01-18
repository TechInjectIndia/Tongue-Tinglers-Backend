import {PendingOrderModel} from "../models/PendingOrderTable";
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
import {FranchiseModel} from "apps/franchise/models/FranchiseTable";
import {OrderItemsModel} from "apps/order-items/models/OrderItemsTable";
import {BaseOrderItem, ORDER_ITEM_TYPE} from "../../order/interface/OrderItem";
import {NotesModel} from "../../order/models/NotesTable";
import order from "../../../static/views/email/react-templates/Order";

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
       try {
    // Start a transaction
    // const transaction = await PendingOrderModel.sequelize?.transaction();
    //
    // if (!transaction) {
    //     return getHandledErrorDTO("Failed to start transaction");
    // }

    try {
        // Find user within transaction
        const user = await UserModel.findByPk(payload.customer_details,);
        if (!user) {
            throw new Error(`User with ID ${payload.customer_details} not found.`);
        }
        // Create order items within transaction
        const orderItemIds = await Promise.all(
            payload.orderItems.map(async (item) => {
                const orderItem = await OrderItemsModel.create(item);
                return orderItem.id;
            })
        );

        // Create pending order within transaction
        const pendingOrder = await PendingOrderModel.create(payload);
        // Associate order items within transaction
        await pendingOrder.addPendingOrderItems(orderItemIds);

        const resp = await PendingOrderModel.findOne({where:{id:pendingOrder.id},
            include: [
                // { model: UserModel, as: "customer" },
                // { model: FranchiseModel, as: "franchise" },
                { model: OrderItemsModel, as: "pendingOrderItems", through: { attributes: [] } },
                { model: UserModel, as: "createdByUser" },
                { model: UserModel, as: "deletedByUser" },
                { model: UserModel, as: "updatedByUser" },
            ],})

        return getSuccessDTO(parseOrder(pendingOrder.toJSON()));

    } catch (innerError) {
        // Rollback transaction on error
        // await transaction.rollback();
        console.error('Transaction failed:', innerError);
        return getHandledErrorDTO(innerError.message || "Transaction failed");
    }

} catch (error) {
    console.error('Outer error:', error);
    return getHandledErrorDTO("Failed to process order");
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
