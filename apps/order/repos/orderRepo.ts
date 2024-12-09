import {
    BaseNotes,
    BaseOrder,
    Notes,
    Order,
    OrderPayload,
} from "../../../interfaces/orders";
import { IOrderRepo } from "./IOrderRepo";
import { OrderModel } from "../../../database/schema/order/orderModel";
import { NotesModel } from "../../../database/schema/order/notesModel";
import { Pagination } from "../../../interfaces";

export class OrderRepo implements IOrderRepo {
    async createOrder(order: OrderPayload): Promise<Order | null> {
        try {
            let notesCreated: Notes[] = [];
            const { notes, ...orderDetails } = order;

            // Create notes if provided
            if (notes && notes.length > 0) {
                notesCreated = await Promise.all(
                    notes.map(async (note) => {
                        const createdNote = await NotesModel.create(note);
                        return createdNote.toJSON(); // Convert to plain object if needed
                    })
                );
            }

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
    getAllOrders(page: number,limit: number,search: string,filters: object): Promise<Pagination<Order>> {
        try {
            const offset = (page - 1) * limit;

            const query: any = {};

        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
