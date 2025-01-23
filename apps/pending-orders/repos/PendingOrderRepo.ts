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
import {OrderItemsModel} from "apps/order-items/models/OrderItemsTable";
import {BaseOrderItem, ORDER_ITEM_TYPE} from "../../order/interface/OrderItem";
import {OptionsValueModel} from "../../optionsValue/models/OptionValueTable";
import RepoProvider from "../../RepoProvider";
import { PendingOrderPayload } from "../interface/PendingOrder";
import { FranchiseModel } from "apps/franchise/models/FranchiseTable";
import { ProductVariationsModel } from "apps/product-options/models/ProductVariationTable";
import { ProductModel } from "apps/product/model/productTable";
import { ProductsCategoryModel } from "apps/products-category/models/ProductCategoryTable";
import { OptionsModel } from "apps/options/models/optionTable";
import { PendingOrderItemModel } from "../models/PendingOrderItemTable";

export class PendingOrderRepo implements IPendingOrderRepo {
    async deleteAllPendingOrderByOrderId(pendingOrderId: number, transaction?: Transaction): Promise<DTO<ParsedOrder>> {
        console.log('pendingOrderId: ', pendingOrderId);
        try{
            const deletedPendingOrder = await this.getPendingOrderById(pendingOrderId, transaction, 'Pending order deleted successfully');
            // Check if the pending order exists
            const pendingOrder = await PendingOrderModel.findOne({where:{id: pendingOrderId}, transaction});
            if (!pendingOrder) {
                return getHandledErrorDTO(`Pending order with ID ${pendingOrderId} not found.`, null);
            }

            // Delete all dependent PendingOrderItems
            await PendingOrderItemModel.destroy({
                where: { id: pendingOrderId },
                transaction
            });

            // Delete the PendingOrder itself
            await PendingOrderModel.destroy({
                where: { id: pendingOrderId },
                transaction
            });

            return deletedPendingOrder

        }catch(error){
            console.log(error);
            return getHandledErrorDTO(error.message, error);
        }
    }
    async getPendingOrderByAttributes(payload: any, transaction?: Transaction): Promise<DTO<ParsedOrder>> {
        try{
            const options: any = {
                returning: true
            };
            if (transaction) {
                options.transaction = transaction;
            }
            const pendingOrderData = await PendingOrderModel.findOne({
                where: payload,
                include: [
                    { 
                        model: PendingOrderItemModel, 
                        as: "orderItems", 
                        include:[
                            {
                                model: ProductVariationsModel,
                                as: 'variationData',
                                include:[
                                    {
                                        model: ProductModel,
                                        as: 'productData',
                                        include: [
                                            {
                                                model: ProductsCategoryModel,
                                                as: "productCategory", // Include createdByUser
                                                attributes: ["id", "name", "description"], // Include these fields from the User model
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
                                            },
                                        ]
                                    },
                                    {
                                        model: OptionsValueModel,
                                        as: "optionsValue", // Include these fields from the User model
                                        attributes: ["id", "name", "option_id"],
                                        include: [
                                            {
                                                model: OptionsModel,
                                                as: "options",
                                                attributes: ["id", "name"],
                                            },
                                        ],
                                    },
                                ]
                            },
                            {
                                model: UserModel,
                                as: 'createdByUser'
                            },
                            {
                                model: UserModel,
                                as: 'updatedByUser'
                            },
                            {
                                model: UserModel,
                                as: 'deletedByUser'
                            }
                        ] 
                    },
                    { 
                        model: UserModel, 
                        as: "customer" 
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
                    },
                    {
                        model: FranchiseModel,
                        as: 'franchiseData'
                    },
                ],
            })
            return pendingOrderData ? getSuccessDTO(parseOrder(pendingOrderData.toJSON())) : getHandledErrorDTO("Not Found")
        }catch(error){
            console.log(error);
            return getHandledErrorDTO(error.message, error)
        }
    }

    async create(payload: PendingOrderPayload, userId: number, transaction?: Transaction) : Promise<DTO<ParsedOrder>> {
        try {
            const options: any = {
                returning: true
            };
            if (transaction) {
                options.transaction = transaction;
            }

            const pendingOrderCreated = await PendingOrderModel.create(payload, options);
            if(!pendingOrderCreated){
                return getHandledErrorDTO("Error while creating pending order");
            }
            const pendingOrderItemPayload = payload.items.map((item) => ({
                orderId: pendingOrderCreated.id,
                product: item.product,
                variation: item.variation,
                quantity: item.quantity,
                price: item.price,
                totalPrice: item.totalPrice,
                totalTax: item.totalTax,
                couponDiscount: item.couponDiscount,
                type: item.type,
                createdBy: pendingOrderCreated['createdBy']
            }))

            const orderItemsCreated = await PendingOrderItemModel.bulkCreate(pendingOrderItemPayload, options)

            if (!orderItemsCreated || orderItemsCreated.length === 0) {
                return getHandledErrorDTO("Error while creating order items");
            }
            // Fetch the created order with associated items
            const completePendingOrder = await this.getPendingOrderById(pendingOrderCreated.id, transaction, 'Pending Order Created Successfully');
            return completePendingOrder
        } catch (error) {
            console.log(error);
            return getHandledErrorDTO(error.message, error);
        }
    }

    async getPendingOrderById(pendingOrderId: number, transaction?: Transaction, message?: string): Promise<DTO<ParsedOrder>>{
        try{
            const options: any = {
                returning: true
            };
            if (transaction) {
                options.transaction = transaction;
            }
            const pendingOrderData = await PendingOrderModel.findOne({
                where: { id: pendingOrderId },
                include: [
                    { 
                        model: PendingOrderItemModel, 
                        as: "orderItems", 
                        include:[
                            {
                                model: ProductVariationsModel,
                                as: 'variationData',
                                include:[
                                    {
                                        model: ProductModel,
                                        as: 'productData',
                                        include: [
                                            {
                                                model: ProductsCategoryModel,
                                                as: "productCategory", // Include createdByUser
                                                attributes: ["id", "name", "description"], // Include these fields from the User model
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
                                            },
                                        ]
                                    },
                                    {
                                        model: OptionsValueModel,
                                        as: "optionsValue", // Include these fields from the User model
                                        attributes: ["id", "name", "option_id"],
                                        include: [
                                            {
                                                model: OptionsModel,
                                                as: "options",
                                                attributes: ["id", "name"],
                                            },
                                        ],
                                    },
                                ]
                            },
                            {
                                model: UserModel,
                                as: 'createdByUser'
                            },
                            {
                                model: UserModel,
                                as: 'updatedByUser'
                            },
                            {
                                model: UserModel,
                                as: 'deletedByUser'
                            }
                        ] 
                    },
                    { 
                        model: UserModel, 
                        as: "customer" 
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
                    },
                    {
                        model: FranchiseModel,
                        as: 'franchiseData'
                    },
                ],
            })
            return pendingOrderData ? getSuccessDTO(parseOrder(pendingOrderData.toJSON()), message) : getHandledErrorDTO("Not Found")
        }catch(error){
            console.log(error);
            return getHandledErrorDTO(error.message, error)
        }
    }

//     async createPendingOrderPayload(order:ParsedOrder, paymentOrderId:string,userId:number){
//         // const pendingOrderPayload: OrderPayload = {
//         //     anomalyArr: [],
//         //     billingAddress: order.billingAddress,
//         //     cancelled_items: [],
//         //     createdBy: userId,
//         //     customer_details: userId,
//         //     deletedBy: null,
//         //     delivery_details: order.deliveryDetails,
//         //     delivery_status: "",
//         //     discount_prices: "",
//         //     franchise: null,
//         //     item_count: 0,
//         //     notes: [],
//         //     orderItems: order.items.map((d)=>{const dd:BaseOrderItem={
//         //         coupon_discount: 0,
//         //         points_discount: 0,
//         //         product_id: d.product.id,
//         //         product_option_id: d.productOption.id,
//         //         quantity: d.quantity,
//         //         student_discount: Number(d.totalDiscount),
//         //         total_price: Number(d.total_price),
//         //         total_tax: Number(d.totalTax),
//         //         type: order.orderType===ORDER_TYPE.RM_ORDER?ORDER_ITEM_TYPE.PACKAGING:ORDER_ITEM_TYPE.RETORT
//         //     }
//         //     return dd;
//         //     }),
//         //     order_type: order.orderType??ORDER_TYPE.RM_ORDER,
//         //     payment_id: paymentOrderId,
//         //     payment_type: "",
//         //     prices: "",
//         //     shippingAddress: order.shippingAddress,
//         //     status: order.status,
//         //     total: Number(order.total),
//         //     total_discount: Number(order.totalDiscount),
//         //     total_shipping: Number(order.totalShipping),
//         //     total_tax: Number(order.totalTax),
//         //     updatedBy: null
//         // };

//         // console.log("******");
//         // console.log(pendingOrderPayload);
//         // console.log("******");
//         // return pendingOrderPayload;
//     }

//     async deleteAllPendingOrderByOrderId(id:number){
//         try{
//             return await PendingOrderModel.destroy({
//                 where: {
//                     id
//                 }
//             });
//         }catch(error){
//             console.log(error);
//             return null;
//         }
//     }
}
