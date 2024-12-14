import {
    BaseNotes,
    BaseOrder,
    Notes,
    Order,
    OrderPagination,
    OrderPayload,
} from "../../../interfaces/orders";
import { IOrderRepo } from "./IOrderRepo";
import { OrderModel } from "../../../database/schema/order/orderModel";
import { NotesModel } from "../../../database/schema/order/notesModel";
import { Pagination } from "../../../interfaces";
import { Op } from "sequelize";
import { OrderItem } from "../../../interfaces/order_items";
import { OrderItemModel } from "../../../database/schema/order-items/orderItemsModel";
import { OrderItemsModel } from "../../../database/schema";

export class OrderRepo implements IOrderRepo {
    async createOrder(order: OrderPayload): Promise<Order | null> {
        try {
            let notesCreated: Notes[] = [];
            let orderItemsCreated: OrderItem[] = [];
            const { notes,order_items, ...orderDetails } = order;

            if(order_items && order_items.length > 0){
                orderItemsCreated = await Promise.all(
                    order_items.map(async (orderItem) => {
                        const createdOrderItem = await OrderItemModel.create(orderItem);
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

            const orderItemIds = orderItemsCreated.map((orderItem)=> orderItem.id)
            const noteIds = notesCreated.map((note) => note.id);

            // Create the order
            const orderCreated = await OrderModel.create({
                ...orderDetails, // Spread the remaining order details
                // notes: noteIds, // Link notes by their IDs
                createdAt: new Date(),
            }, { include: [{ association: 'noteses' }] });

            orderCreated.addNoteses(noteIds);

            return orderCreated.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    updateOrder(order: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteOrder(orderId: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getOrderById(orderId: number): Promise<any> {
        try {
            return OrderModel.findByPk(orderId, {
                include: [{ model: NotesModel, as: "noteses", through: { attributes: [] }, }],
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
            include: [{ model: NotesModel, as: "noteses", through: { attributes: [] }, }],
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
    
}
