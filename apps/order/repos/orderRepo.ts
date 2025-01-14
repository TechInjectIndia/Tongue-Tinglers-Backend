import { IOrderRepo } from "./IOrderRepo";
import { OrderModel } from "../models/OrderTable";
import { NotesModel } from "../models/NotesTable";
import { Op } from "sequelize";

import { OrderItemsModel } from "../../order-items/models/OrderItemsTable";
import { OrderItem } from "../../order-items/interface/orderItem";
import {
    IOrderUpdate,
    Notes,
    Order,
    OrderPagination,
    OrderPayload,
    OrderState,
    ParsedOrder,
    RPOrder,
} from "../interface/Order";
import { parseOrder } from "../parser/parseOrder";
import { OrderProvider } from "apps/order-provider/provider/OrderProvider";
import { DTO, getHandledErrorDTO, getSuccessDTO, getUnhandledErrorDTO } from "apps/common/models/DTO";
import { PendingOrderRepo } from "apps/pending-orders/repos/PendingOrderRepo";
import { sequelize } from "config/database";

export class OrderRepo implements IOrderRepo {
    async createOrder(order: OrderPayload): Promise<Order | null> {
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
            if (notes && notes.length > 0) {
                notesCreated = await Promise.all(
                    notes.map(async (note) => {
                        const createdNote = await NotesModel.create(note);
                        return createdNote.toJSON(); // Convert to plain object if needed
                    })
                );
            }

            const orderItemIds = orderItemsCreated.map((orderItem) => orderItem.id);
            const noteIds = notesCreated.map((note) => note.id);

            // Create the order
            const orderCreated = await OrderModel.create(
                {
                    ...orderDetails, // Spread the remaining order details
                    // notes: noteIds, // Link notes by their IDs
                    createdAt: new Date(),
                },
                { include: [{ association: "noteses" }] }
            );

            orderCreated.addNotes(noteIds);

            return orderCreated.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateOrder(order: IOrderUpdate): Promise<DTO<ParsedOrder | null>> {
        try {

            const orderId = order.id;

            /* Fetch the existing order to ensure it exists */
            const existingOrder = await OrderModel.findByPk(orderId);

            if (!existingOrder) {
                return getHandledErrorDTO("Order not found");
            }

            /* transaction */
            // const transaction = await sequelize.transaction();

            if (order.status) {
                /* Update the order details */
                await existingOrder.update({
                    status: order.status,
                    updatedBy: order.updatedBy,
                    updatedAt: new Date(),
                }, {
                    // transaction: transaction,
                });
            }

            if (order.note) {
                await existingOrder.addNote({
                    isNew: order.note.isNew,
                    notes: order.note.notes,
                    createdBy: order.note.createdBy,
                } as any);
            }

            return getSuccessDTO(parseOrder(existingOrder.toJSON()));
        } catch (error) {

            return null;
        }
    }
    deleteOrder(orderId: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getOrderById(orderId: number): Promise<any> {
        try {
            return OrderModel.findByPk(orderId, {
                include: [{ model: NotesModel, as: "noteses", through: { attributes: [] } }],
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
        filters: Record<string, any>
    ): Promise<OrderPagination<OrderModel>> {
        try {
            const offset = (page - 1) * limit;

            // Building the query
            const query: any = {
                where: {},
                limit,
                offset,
                include: [{ model: NotesModel, as: "noteses", through: { attributes: [] } }],
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
            const { rows, count: total } = await OrderModel.findAndCountAll(query);

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
        state: OrderState
    ): Promise<DTO<{ rpOrder: RPOrder; parsedOrder: ParsedOrder }>> {
        return new OrderProvider().processOrder(state);
    }

    async proceedToPayment(state: OrderState): Promise<DTO<boolean>> {
        try {
            const order = await new OrderProvider().processOrder(state);
            console.log('here');

            const pendingOrderData = await new PendingOrderRepo().createPendigOrderPayload(order);
            console.log(pendingOrderData);

            await new PendingOrderRepo().create(pendingOrderData);
            return getSuccessDTO(true);
        } catch (err) {
            return getUnhandledErrorDTO(err.message);
        }
    }

    async getOrdersByUser(userId: number): Promise<ParsedOrder[]> {
        try {
            const orders = await OrderModel.findAll({
                where: { customer_details: userId },
                include: [{ model: NotesModel, as: "noteses", through: { attributes: [] } }],
            });
            return orders.map((order) => parseOrder(order));
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
