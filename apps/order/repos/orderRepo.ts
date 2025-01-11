import { IOrderRepo } from "./IOrderRepo";
import { OrderModel } from "../models/OrderTable";
import { NotesModel } from "../models/NotesTable";
import { Op, Transaction } from "sequelize";

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
import { PendingOrderModel } from "../../pending-orders/models/PendingOrderTable";
import { ProcessPostOrderResult } from "../interface/ProcessPostOrderResult";

export class OrderRepo implements IOrderRepo {
    async createOrder(order: OrderPayload): Promise<Order | null> {
        try {
            let notesCreated: Notes[] = [];
            let orderItemsCreated: any[] = [];
            const { notes, orderItems, ...orderDetails } = order;

            if (orderItems && orderItems.length > 0) {
                orderItemsCreated = await Promise.all(
                    orderItems.map(async (orderItem) => {
                        const createdOrderItem =
                            await OrderItemsModel.create(orderItem);
                        return createdOrderItem.toJSON(); // Convert to plain object if needed
                    }),
                );
            }

            // Create notes if provided
            if (notes && notes.length > 0) {
                notesCreated = await Promise.all(
                    notes.map(async (note) => {
                        const createdNote = await NotesModel.create(note);
                        return createdNote.toJSON(); // Convert to plain object if needed
                    }),
                );
            }

            const orderItemIds = orderItemsCreated.map(
                (orderItem) => orderItem.id,
            );
            const noteIds = notesCreated.map((note) => note.id);

            // Create the order
            const orderCreated = await OrderModel.create(
                {
                    ...orderDetails, // Spread the remaining order details
                    // notes: noteIds, // Link notes by their IDs
                    createdAt: new Date(),
                },
                { include: [{ association: "noteses" }] },
            );

            orderCreated.addNoteses(noteIds);

            return orderCreated.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateOrder(order: any): Promise<Order | null> {
        try {
            const orderId = order.id;
            let notesUpdated: Notes[] = [];
            let orderItemsUpdated: OrderItem[] = [];
            const { notes, order_items, ...orderDetails } = order;

            // Fetch the existing order to ensure it exists
            const existingOrder = await OrderModel.findByPk(orderId, {
                include: [
                    { association: "noteses" },
                    { association: "orderItems" },
                ],
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

            return existingOrder.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    deleteOrder(orderId: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getOrderById(orderId: number): Promise<any> {
        try {
            return OrderModel.findByPk(orderId, {
                include: [
                    {
                        model: NotesModel,
                        as: "noteses",
                        through: { attributes: [] },
                    },
                ],
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getAllOrders(
        page: number,
        limit: number,
        search: string,
        filters: Record<string, any>,
    ): Promise<OrderPagination<OrderModel>> {
        try {
            const offset = (page - 1) * limit;

            // Building the query
            const query: any = {
                where: {},
                limit,
                offset,
                include: [
                    {
                        model: NotesModel,
                        as: "noteses",
                        through: { attributes: [] },
                    },
                ],
            };

            // Adding search functionality
            if (search) {
                query.where = {
                    ...query.where,
                    [Op.or]: [
                        { status: { [Op.iLike]: `%${search}%` } }, // Case-insensitive search for status
                        { delivery_status: { [Op.iLike]: `%${search}%` } }, // Case-insensitive search for delivery_status
                        { payment_type: { [Op.iLike]: `%${search}%` } }, // Case-insensitive search for payment_type
                    ],
                };
            }

            // Applying filters (if provided)
            if (filters) {
                Object.entries(filters).forEach(([key, value]) => {
                    query.where[key] = value;
                });
            }

            // Fetch data with total count
            const { rows, count: total } =
                await OrderModel.findAndCountAll(query);

            // Returning paginated result
            return {
                data: rows, // Corrected from "order" to "rows"
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
        state: OrderState,
    ): Promise<DTO<{ rpOrder: RPOrder; parsedOrder: ParsedOrder }>> {
        return new OrderProvider().processOrder(state);
    }

    async proceedToPayment(
        state: OrderState,
    ): Promise<{ rpOrder: RPOrder; parsedOrder: ParsedOrder }> {
        throw new Error("Method not implemented.");
    }

    async getOrdersByUser(userId: number): Promise<ParsedOrder[]> {
        try {
            const orders = await OrderModel.findAll({
                where: { customer_details: userId },
                include: [
                    {
                        model: NotesModel,
                        as: "noteses",
                        through: { attributes: [] },
                    },
                ],
            });
            return orders.map((order) => parseOrder(order));
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async processPostOrderTransaction(
        paymentOrderId: string,
    ): Promise<DTO<ProcessPostOrderResult>> {
        try {
            const transaction = await sequelize.transaction();

            //     validate already processedOrder
            const validationRes = await this.validateAlreadyProcessedOrder(
                transaction,
                paymentOrderId,
            );

            if (
                !validationRes.success ||
                !validationRes.data.pendingOrder ||
                validationRes.data.alreadyProcessed
            ) {
                return validationRes;
            }

            //     Process the Order

            //     process Stock

            //     save order

            //     update pendingOrder

            //     save payment

            //     clear cart

            await transaction.commit();
        } catch (error: any) {
            handleError(error);

            return getUnhandledErrorDTO(
                `${error.message ?? ""}: error in process order transaction`,
            );
        }

        return getSuccessDTO(null);
    }

    //     Private Functions:

    private async validateAlreadyProcessedOrder(
        transaction: Transaction,
        paymentOrderId: string,
    ): Promise<DTO<ProcessPostOrderResult>> {
        const res: ProcessPostOrderResult = {
            pendingOrder: null,
            alreadyProcessed: false,
        };

        //     get pending Order
        const pendingOrder = (
            await PendingOrderModel.findOne({
                where: {
                    paymentOrderId,
                },
                transaction,
            })
        ).toJSON();

        if (!pendingOrder) {
            return getSuccessDTO(
                res,
                `Pending order not found for: paymentOrderId ${paymentOrderId}`,
            );
        }

        res.pendingOrder = pendingOrder;

        // validate already processed case
        if (pendingOrder.status === OrderStatus.PROCESSED) {
            res.alreadyProcessed = true;
            return getSuccessDTO(
                res,
                `Pending order:${pendingOrder.id},  for: paymentOrderId ${paymentOrderId} is Already processed`,
            );
        }

        return getSuccessDTO(res);
    }

    private clearCart(transaction: Transaction, userId: number) {}
}
