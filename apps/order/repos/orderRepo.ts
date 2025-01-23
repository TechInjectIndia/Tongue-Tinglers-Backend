import { IOrderRepo } from "./IOrderRepo";
import { OrderModel } from "../models/OrderTable";
import { NotesModel } from "../models/NotesTable";
import { Op, Sequelize, Transaction, where } from "sequelize";

import { OrderItemsModel } from "../../order-items/models/OrderItemsTable";
import { OrderItem, OrderItemPayload } from "../../order-items/interface/orderItem";
import {
    Notes,
    Order,
    OrderPagination,
    OrderPayload,
    OrderState,
    OrderStatus,
    ParsedOrder,
    RPOrder,
} from "../interface/Order";
import { parseOrder } from "../parser/parseOrder";
import { OrderProvider } from "apps/order-provider/provider/OrderProvider";
import {
    DTO,
    DTO_CODE,
    getHandledErrorDTO,
    getSuccessDTO,
    getUnhandledErrorDTO,
} from "apps/common/models/DTO";
import { handleError } from "../../common/utils/HelperMethods";
import { sequelize } from "../../../config";
import { ProcessPostOrderResult } from "../interface/ProcessPostOrderResult";
import { ProductVariationsModel } from "../../product-options/models/ProductVariationTable";
import { ProductOptions } from "../../product/interface/ProductOptions";
// import { PendingOrderRepo } from "../../pending-orders/repos/PendingOrderRepo";
import { RPOrderTable } from "apps/rp-order/models/RPOrderTable";
import { UserModel } from "apps/user/models/UserTable";
import { FranchiseModel } from "apps/franchise/models/FranchiseTable";
import RepoProvider from "../../RepoProvider";
import {getRawAsset} from "node:sea";
import {OptionsValueModel} from "../../optionsValue/models/OptionValueTable";
import {OptionsModel} from "../../options/models/optionTable";
import {ProductModel} from "../../product/model/productTable";
import {
    ProductsCategoryModel
} from "../../products-category/models/ProductCategoryTable";
import { LogModel } from "apps/logs/models/LogsTable";

export class OrderRepo implements  IOrderRepo{
    proceedToPayment(state: OrderState, userId: number): Promise<DTO<{ rpOrder: RPOrder; parsedOrder: ParsedOrder; }>> {
        throw new Error("Method not implemented.");
    }
    async updateOrder(orderId: number, order: OrderPayload, userId:number, transaction?: Transaction): Promise<DTO<ParsedOrder | null>> {
        try{
            let noteIds: number[] = [];
            const {status, deliveryStatus} = order;

            const existingOrder = await OrderModel.findByPk(orderId, {
                transaction
            })

            if(!existingOrder){
                return getHandledErrorDTO("Order not found");
            }

            if (status) existingOrder.status = status;
            if (deliveryStatus) existingOrder.deliveryStatus = deliveryStatus;
            existingOrder.updatedBy = userId
            await existingOrder.save({ transaction });

            if (order.notes && Array.isArray(order.notes)) {
                for (const note of order.notes) {
                    if (note.id) {
                        // If ID exists, update the record
                        const existingNotes = await NotesModel.findByPk(
                            note.id
                        );
                        if (existingNotes) {
                            note.updatedBy = userId
                            await existingNotes.update(note);
                        } else {
                            console.warn(
                                `Notes with ID ${note.id} not found. Skipping update.`
                            );
                        }
                    } else {
                        note.createdBy = userId
                        // If no ID, create a new record
                        const newDetail = await NotesModel.create(note);
                        noteIds.push(newDetail.id);
                        await existingOrder.addNotes(noteIds);
                    }
                }
            }

            const updatedOrder = await this.getOrderById(existingOrder.id, transaction, 'Order Updated Successfully');

            return updatedOrder
        }catch(error){
            console.log(error);
            return getHandledErrorDTO(error.message, error);
        }
    }
    async getAllOrders(page: number, limit: number, search: string, filters: Record<string, any>, transaction?: Transaction): Promise<DTO<OrderPagination<ParsedOrder>>> {
        try{
            const offset = (page - 1) * limit;

            const query: any = {
                where: {},
                offset,
                limit,
                order: [["createdAt", "DESC"]], // Orders sorted by creation date (newest first)
                transaction
            };

            // Include associations if needed
            query.include = [
                { 
                    model: OrderItemsModel, 
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
                {
                    model: NotesModel,
                    as: 'notes',
                    through:{attributes:[]},
                    include: [
                        {
                            model: UserModel,
                            as: 'createdByUser',
                        },
                        {
                            model: UserModel,
                            as: 'updatedByUser',
                        },
                        {
                            model: LogModel,
                            as: 'logs',
                            where: {model: 'Notes'},
                            required: false
                        }
                    ]
                },
                {
                    model: LogModel,
                    as: 'logs',
                    where: {model: 'Order'}
                }
            ]   
                 
            // Fetch orders and count total records
            const { rows, count } = await OrderModel.findAndCountAll(query);

            // Pagination details
            const totalPages = Math.ceil(count / limit);
            const parsedData = rows.map(data => parseOrder(data))
            return getSuccessDTO({
                data: parsedData,
                total: count,
                totalPages,
                page: parseInt(page.toString()),
                limit: parseInt(limit.toString())
            },'Fetched Successfully')
        }catch(error){
            console.log(error);
            return getHandledErrorDTO(error.message, error);
        }
    }

    async createOrder(order: OrderPayload,transaction?: Transaction): Promise<DTO<ParsedOrder | null>> {
        try {
            const options: any = {
                returning: true
            };
            if (transaction) {
                options.transaction = transaction;
            }
            const orderCreated = await OrderModel.create(order, options);
            if(!orderCreated){
                return getHandledErrorDTO("Error while creating order");
            }

            const orderItemPayload = order.items.map((item) => ({
                orderId: orderCreated.id,
                product: item.product,
                variation: item.variation,
                quantity: item.quantity,
                price: item.price,
                totalPrice: item.totalPrice,
                totalTax: item.totalTax,
                couponDiscount: item.couponDiscount,
                type: item.type,
                createdBy: order['createdBy']
            }))

            const orderItemsCreated = await OrderItemsModel.bulkCreate(orderItemPayload, options)

            if (!orderItemsCreated || orderItemsCreated.length === 0) {
                return getHandledErrorDTO("Error while creating order items");
            }
            // Fetch the created order with associated items
            const completeOrder = await this.getOrderById(orderCreated.id, transaction, 'Order Created Successfully');
            return completeOrder
        } catch (error) {
            console.log(error);
            return getHandledErrorDTO(error.message, error);
        }
    }

    deleteOrder(orderId: number): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getOrderById(orderId: number, transaction?: Transaction, message?: string): Promise<DTO<ParsedOrder>> {
        try {
            const options: any = {
                returning: true
            };
            if (transaction) {
            options.transaction = transaction;
            }
            const orderData = await OrderModel.findOne({
                where: { id: orderId },
                include: [
                    { 
                        model: OrderItemsModel, 
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
                    {
                        model: NotesModel,
                        as: 'notes',
                        through:{attributes:[]},
                        include: [
                            {
                                model: UserModel,
                                as: 'createdByUser',
                            },
                            {
                                model: UserModel,
                                as: 'updatedByUser',
                            },
                            {
                                model: LogModel,
                                as: 'logs',
                                where: {model: 'Notes'}
                            }
                        ]
                    },
                    {
                        model: LogModel,
                        as: 'logs',
                        where: {model: 'Order'}
                    }
                ],
            })
            return orderData ? getSuccessDTO(parseOrder(orderData.toJSON()), message) : getHandledErrorDTO("Not Found")
        } catch (error) {
            console.log(error);
            return getHandledErrorDTO(error.message, error)
        }
    }

    async processOrder(
        state: OrderState
    ): Promise<DTO<{ rpOrder: RPOrder; parsedOrder: ParsedOrder }>> {
        return new OrderProvider().processOrder(state);
    }

    // async proceedToPayment(
    //     state: OrderState,
    //     userId:number
    // ): Promise<DTO<{ rpOrder: RPOrder; parsedOrder: ParsedOrder }>> {
    //     try {
    //         const order = await new OrderProvider().processOrder(state);
    //         const pendingOrderData = await new PendingOrderRepo().createPendingOrderPayload(order.data.parsedOrder,order.data.rpOrder.id,userId);
    //         await new PendingOrderRepo().create(pendingOrderData)
    //         await RPOrderTable.create(order.data.rpOrder);

    //         return order;
    //     } catch (err) {
    //         return getUnhandledErrorDTO(err.message);
    //     }
    // }
    async getOrdersByUser(userId: number): Promise<ParsedOrder[]> {
        try {
            // const orders = await OrderModel.findAll({
            //     where: { customer_details: userId },
            //     include: [
            //         { model: UserModel, as: "customer" },
            //         // { model: FranchiseModel, as: "franchise" },
            //         { model: NotesModel, as: "notes", through: { attributes: [] } },
            //         { model: OrderItemsModel, as: "orderItems", through: { attributes: [] } },
            //         { model: UserModel, as: "createdByUser" },
            //         { model: UserModel, as: "deletedByUser" },
            //         { model: UserModel, as: "updatedByUser" },
            //     ],
            // });
            // return await Promise.all(orders.map((order) => parseOrder(order)));
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async processPostOrderTransaction(
        paymentOrderId: string
    ): Promise<DTO<ProcessPostOrderResult>> {
        try {
            const transaction = await sequelize.transaction();

            //  validate already processedOrder
            // const validationRes = await this.validateAlreadyProcessedOrder(
            //     transaction,
            //     paymentOrderId
            // );

            // if (
            //     !validationRes.success ||
            //     !validationRes.data.order ||
            //     validationRes.data.alreadyProcessed
            // ) {
            //     return validationRes;
            // }

            //     Process the Order NOW!

            // const result = validationRes.data;

            // const p1 = this.processStock(transaction, result.order);

            // const p2 = this.createOrderAndUpdatePendingOrder(transaction, result.order);

            // const p3 = this.clearCart(transaction, result.order.customerDetails.id);

            // await Promise.all([p1, p2, p3]);

            // await transaction.commit();

            // return getSuccessDTO(result);
        } catch (error: any) {
            handleError(error);

            return getUnhandledErrorDTO(
                `${error.message ?? ""}: error in process order transaction`
            );
        }
    }

    //     Private Functions:

    // private async validateAlreadyProcessedOrder(
    //     transaction: Transaction,
    //     paymentOrderId: string
    // ): Promise<DTO<ProcessPostOrderResult>> {
    //     const res: ProcessPostOrderResult = {
    //         order: null,
    //         alreadyProcessed: false,
    //     };

    //     const pendingOrder = await  RepoProvider.pendingOrderRepo.getPendingOrderByAttributes({payment_id:paymentOrderId,})

    //     if (!pendingOrder) {
    //         return getSuccessDTO(
    //             res,
    //             `Pending order not found for: paymentOrderId ${paymentOrderId}`
    //         );
    //     }


    //     res.order = pendingOrder;

    //     // validate already processed case
    //     if (pendingOrder.status === OrderStatus.PROCESSED) {
    //         res.alreadyProcessed = true;
    //         return getSuccessDTO(
    //             res,
    //             `Pending order:${pendingOrder.id},  for: paymentOrderId ${paymentOrderId} is Already processed`
    //         );
    //     }
    //     return getSuccessDTO(res);
    // }

    private getStockIds(order: ParsedOrder): number[] {
        return order.items.map((item) => item.id);
    }
    private async processStock(transaction: Transaction, order: ParsedOrder) {
        const stocksMap = await this.getStocksMap(transaction, this.getStockIds(order));

        for (const item of order.items) {
            const stockOption = stocksMap.get(item.id);
            if (!stockOption || stockOption.stock < item.quantity) {
                const anomalyQty = item.quantity - (stockOption?.stock ?? 0);
            } else {
                stockOption.stock -= item.quantity;
                stocksMap.set(item.id, stockOption);
            }
        }

        // perform write operations
        const promises: Promise<void>[] = [];

        Array.from(stocksMap).forEach(([id, option]) => {
            const promise = ProductVariationsModel.update(
                { stock: option.stock },
                { where: { id }, transaction }
            ).then(() => {});

            promises.push(promise);
        });

        await Promise.all(promises);
    }

    /**
     * this is supposed to update the id after it is saved in the db, since it works with reference, so outside the scope we need the incremental id
     * @param transaction
     * @param order
     * @private
     */
    private async createOrderAndUpdatePendingOrder(transaction: Transaction, order: ParsedOrder) {
        // todo @Mandeep handle this function
        //     save order in order table
        //     update in pendingOrder table
        //     save payment in paymentTable
    }

    private async getStocksMap(
        transaction: Transaction,
        ids: number[]
    ): Promise<Map<number, ProductOptions>> {
        const options = (
            await ProductVariationsModel.findAll(
                // Fields to update
                {
                    where: { id: { [Op.in]: ids } }, // Match any ID in the array
                    transaction,
                }
            )
        ).map((model) => model.toJSON());

        const result: Map<number, ProductOptions> = new Map(
            options.map((option) => [option.id, option])
        );

        return result;
    }

    private async clearCart(transaction: Transaction, userId: number) {
        // todo @Nitesh clear cart here with transaction!
    }
}
