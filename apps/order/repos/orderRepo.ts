import { IOrderRepo } from "./IOrderRepo";
import { OrderModel } from "../models/OrderTable";
import { NotesModel } from "../models/NotesTable";
import { Op, Sequelize, Transaction, where } from "sequelize";

import { OrderItemsModel } from "../../order-items/models/OrderItemsTable";
import { OrderItem } from "../../order-items/interface/orderItem";
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
    getHandledErrorDTO,
    getSuccessDTO,
    getUnhandledErrorDTO,
} from "apps/common/models/DTO";
import { handleError } from "../../common/utils/HelperMethods";
import { sequelize } from "../../../config";
import { ProcessPostOrderResult } from "../interface/ProcessPostOrderResult";
import { ProductVariationsModel } from "../../product-options/models/ProductVariationTable";
import { ProductOptions } from "../../product/interface/ProductOptions";
import { PendingOrderRepo } from "../../pending-orders/repos/PendingOrderRepo";
import { RPOrderTable } from "apps/rp-order/models/RPOrderTable";
import { UserModel } from "apps/user/models/UserTable";
import { FranchiseModel } from "apps/franchise/models/FranchiseTable";
import RepoProvider from "../../RepoProvider";
import {getRawAsset} from "node:sea";

export class OrderRepo implements  IOrderRepo{
    async createOrder(order: OrderPayload,transaction?: Transaction): Promise<ParsedOrder | null> {
        try {
            let notesCreated: Notes[] = [];
            let orderItemsCreated: any[] = [];
            const { notes, orderItems, ...orderDetails } = order;

            if (orderItems && orderItems.length > 0) {
                orderItemsCreated = await Promise.all(
                    orderItems.map(async (orderItem) => {
                        const createdOrderItem = await OrderItemsModel.create(orderItem);
                        return createdOrderItem.toJSON(); // Convert to plain object if needed
                    })
                );
            }

            // Create notes if provided
            // if (notes && notes.length > 0) {
            //     notesCreated = await Promise.all(
            //         notes.map(async (note) => {
            //             const createdNote = await NotesModel.create(note);
            //             return createdNote.toJSON(); // Convert to plain object if needed
            //         })
            //     );
            // }

            const orderItemIds = orderItemsCreated.map((orderItem) => orderItem.id);
            const noteIds = notesCreated.map((note) => note.id);

            // Create the order
            const orderCreated = await OrderModel.create(
                {
                    ...orderDetails, // Spread the remaining order details
                    // notes: noteIds, // Link notes by their IDs
                    createdAt: new Date(),
                },
                // { include: [{ association: "notes" }], transaction }
            );

            // orderCreated.addNotes(noteIds);
            //
            // // todo @Sumeet add the anomalies here;
            // orderCreated.addAnomalyOrderItems([]);

            return parseOrder(orderCreated.toJSON());
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateOrder(order: any): Promise<ParsedOrder | null> {
        try {
            const orderId = order.id;
            let notesUpdated: Notes[] = [];
            let orderItemsUpdated: OrderItem[] = [];
            const { notes, order_items, ...orderDetails } = order;

            // Fetch the existing order to ensure it exists
            const existingOrder = await OrderModel.findByPk(orderId, {
                include: [{ association: "noteses" }, { association: "orderItems" }],
            });

            if (!existingOrder) {
                throw new Error(`Order with ID ${orderId} not found.`);
            }

            // Update order items if provided
            // if (order_items && order_items.length > 0) {
            //     // Delete existing order items if necessary (optional based on your business logic)
            //     await OrderItemModel.destroy({ where: { id: orderId } });

            //     // Add new or updated order items
            //     orderItemsUpdated = await Promise.all(
            //         order_items.map(async (orderItem) => {
            //             const createdOrderItem = await OrderItemModel.create({ ...orderItem, orderId });
            //             return createdOrderItem.toJSON();
            //         })
            //     );
            // }

            // // Update notes if provided
            // if (notes && notes.length > 0) {
            //     // Delete existing notes if necessary (optional based on your business logic)
            //     await NotesModel.destroy({ where: { order_id: orderId } });

            //     // Add new or updated notes
            //     notesUpdated = await Promise.all(
            //         notes.map(async (note) => {
            //             const createdNote = await NotesModel.create({ ...note, orderId });
            //             return createdNote.toJSON();
            //         })
            //     );
            // }

            // Update the order details
            await existingOrder.update({
                ...orderDetails, // Spread the updated order details
                updatedAt: new Date(),
            });

            // Update associations if necessary
            // const noteIds = notesUpdated.map((note) => note.id);
            // if (noteIds.length > 0) {
            //     await existingOrder.setNoteses(noteIds);
            // }

            return parseOrder(existingOrder.toJSON());
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    deleteOrder(orderId: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getOrderById(orderId: number): Promise<any> {
        try {
            const order = await OrderModel.findByPk(orderId, {
                // include: [
                //     {
                //         model: NotesModel,
                //         as: "noteses",
                //         through: { attributes: [] },
                //     },
                // ],
                include: [
                    {
                        model: UserModel,
                        as: "customer"
                    },
                    // {
                    //     model: FranchiseModel,
                    //     as: "franchise"
                    // },
                    {
                        model: NotesModel,
                        as: "notes",
                        through: { attributes: [] },
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
            });

            return parseOrder(order.toJSON());
        } catch (error) {
            console.log(error);
            return null;
        }
    }
   async getAllOrders(
    page: number,
    limit: number,
    search: string,
    filters: Record<string, any>
): Promise<OrderPagination<ParsedOrder>> {
    try {
        // Validate and normalize pagination parameters
        page = Math.max(1, page || 1);
        limit = Math.max(1, limit || 10);
        const offset = (page - 1) * limit;

        // Build the where clause
        const whereClause: any = {};

        // Add search functionality
        if (search) {
            whereClause[Op.or] = [
                { status: { [Op.iLike]: `%${search}%` } },
                { delivery_status: { [Op.iLike]: `%${search}%` } },
                { payment_type: { [Op.iLike]: `%${search}%` } },
            ];
        }

        // Apply filters if provided
        if (filters && typeof filters === "object") {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    whereClause[key] = value;
                }
            });
        }

        // Fetch paginated data
        const { rows, count: total } = await OrderModel.findAndCountAll({
            include: [
                { model: OrderItemsModel, as: "orderItems", through: { attributes: [] } },
                { model: UserModel, as: "createdByUser" },
                { model: UserModel, as: "deletedByUser" },
                { model: UserModel, as: "updatedByUser" },
            ],
        });

        console.log(rows)
        // Process orders and fetch product options in batch
        const processedOrders = await Promise.all(
            rows.map(async (order) => {
                const orderData:any = order.toJSON();
                if (orderData.orderItems && orderData.orderItems.length > 0) {
                    // Get all product option IDs from this order
                    const productOptionIds = orderData.orderItems.map(item => item.productOption);

                    console.log("546789")
                    console.log(productOptionIds)
                    console.log("5467895678")
                    // Fetch all product options for this order in one query
                    const productOptions = await ProductVariationsModel.findAll({
                        where: {
                            id: productOptionIds
                        }
                    });

                    // Create a map for quick lookup
                    const productOptionMap = productOptions.reduce((acc, option) => {
                        acc[option.id] = option;
                        return acc;
                    }, {});

                    // Attach product options to order items
                    orderData.orderItems = orderData.orderItems.map(item => ({
                        ...item,
                        productOption: productOptionMap[item.productOption] || null
                    }));
                }
                return orderData;
            })
        );

        // Parse the results
        const parsedOrders = await Promise.all(
            processedOrders.map(order => parseOrder(order))
        );

        return {
            data: parsedOrders,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    } catch (error) {
        console.error("Error fetching orders with pagination:", error);
        throw new Error("Failed to fetch orders.");
    }
}


    async processOrder(
        state: OrderState
    ): Promise<DTO<{ rpOrder: RPOrder; parsedOrder: ParsedOrder }>> {
        return new OrderProvider().processOrder(state);
    }

    async proceedToPayment(
        state: OrderState,
        userId:number
    ): Promise<DTO<{ rpOrder: RPOrder; parsedOrder: ParsedOrder }>> {
        try {
            const order = await new OrderProvider().processOrder(state);
            const pendingOrderData = await new PendingOrderRepo().createPendingOrderPayload(order.data.parsedOrder,order.data.rpOrder.id,userId);
            await new PendingOrderRepo().create(pendingOrderData)
            await RPOrderTable.create(order.data.rpOrder);

            return order;
        } catch (err) {
            return getUnhandledErrorDTO(err.message);
        }
    }
    async getOrdersByUser(userId: number): Promise<ParsedOrder[]> {
        try {
            const orders = await OrderModel.findAll({
                where: { customer_details: userId },
                include: [
                    { model: UserModel, as: "customer" },
                    // { model: FranchiseModel, as: "franchise" },
                    { model: NotesModel, as: "notes", through: { attributes: [] } },
                    { model: OrderItemsModel, as: "orderItems", through: { attributes: [] } },
                    { model: UserModel, as: "createdByUser" },
                    { model: UserModel, as: "deletedByUser" },
                    { model: UserModel, as: "updatedByUser" },
                ],
            });
            return await Promise.all(orders.map((order) => parseOrder(order)));
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
            const validationRes = await this.validateAlreadyProcessedOrder(
                transaction,
                paymentOrderId
            );

            if (
                !validationRes.success ||
                !validationRes.data.order ||
                validationRes.data.alreadyProcessed
            ) {
                return validationRes;
            }

            //     Process the Order NOW!

            const result = validationRes.data;

            const p1 = this.processStock(transaction, result.order);

            const p2 = this.createOrderAndUpdatePendingOrder(transaction, result.order);

            const p3 = this.clearCart(transaction, result.order.customerDetails.id);

            await Promise.all([p1, p2, p3]);

            await transaction.commit();

            return getSuccessDTO(result);
        } catch (error: any) {
            handleError(error);

            return getUnhandledErrorDTO(
                `${error.message ?? ""}: error in process order transaction`
            );
        }
    }

    //     Private Functions:

    private async validateAlreadyProcessedOrder(
        transaction: Transaction,
        paymentOrderId: string
    ): Promise<DTO<ProcessPostOrderResult>> {
        const res: ProcessPostOrderResult = {
            order: null,
            alreadyProcessed: false,
        };

        const pendingOrder = await  RepoProvider.pendingOrderRepo.getPendingOrderByAttributes({payment_id:paymentOrderId,})

        if (!pendingOrder) {
            return getSuccessDTO(
                res,
                `Pending order not found for: paymentOrderId ${paymentOrderId}`
            );
        }


        res.order = pendingOrder;

        // validate already processed case
        if (pendingOrder.status === OrderStatus.PROCESSED) {
            res.alreadyProcessed = true;
            return getSuccessDTO(
                res,
                `Pending order:${pendingOrder.id},  for: paymentOrderId ${paymentOrderId} is Already processed`
            );
        }
        return getSuccessDTO(res);
    }

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
