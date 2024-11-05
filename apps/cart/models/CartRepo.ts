import { Op } from "sequelize";
import {
    TListFilters
} from "../../../types";
import {
    TPayloadCart,
    TCartItem,
    TCartList,
    ICartItemAttributes,
} from "../../../interfaces";
import { CartItemModel } from "../../../database/schema"; // Ensure this imports your actual Cart model
import IBaseRepo from '../controllers/controller/ICartController'; // Ensure this interface is correctly defined

export class CartRepo {
    constructor() { }

    // In CartRepo.ts
    public async get(id: string): Promise<any | null> {
        try {
            const cart = await CartItemModel.findOne({ where: { id } });
            return cart; // Return as ICartItemAttributes type
        } catch (error) {
            throw new Error(`Error fetching cart: ${error.message}`);
        }
    }

    /**
     * Create a new cart
     * @param data - Cart data
     * @returns Promise<ICartItemAttributes>
     */
    public async create(data: any): Promise<any> {
        const response = await CartItemModel.create(data);
        return response; // Return the created cart as ICartItemAttributes type
    }

    /**
     * Update cart items
     * @param id - The cart ID
     * @param data - Data to update
     * @returns Promise<number>
     */
    public async update(id: string, data: any): Promise<number> {
        const [affectedCount] = await CartItemModel.update(data, {
            where: {
                id,
            },
        });
        return affectedCount; // Return affected count directly
    }

    /**
     * Delete items from the cart
     * @param ids - Array of cart item IDs to delete
     * @returns Promise<number>
     */
    public async delete(ids: string[]): Promise<number> {
        const response = await CartItemModel.destroy({
            where: {
                id: ids,
            },
        });
        return response; // Return the number of deleted rows
    }

    /**
     * Empty the cart
     * @param id - The cart ID
     * @returns Promise<void>
     */
    public async empty(id: string): Promise<void> {
        await CartItemModel.destroy({
            where: {
                cart_id: id, // Assuming you have a cartId reference in your items
            },
        });
    }
}
