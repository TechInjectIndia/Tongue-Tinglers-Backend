import { Response } from "express";
import { TOrder, TOrderFilters, TOrdersList } from "../../../../../types";

/**
 * Interface for Franchise Order Controller.
 */
interface IFranchiseOrderController<T, F extends TOrderFilters> {
    /**
     * Retrieve an order by its ID.
     * @param id - The ID of the order to retrieve.
     * @returns Promise resolving to the order object or null if not found.
     */
    getOrderStatusById(id: number): Promise<T | null>;
    
    /**
     * Retrieve an order by its ID.
     * @param id - The ID of the order to retrieve.
     * @returns Promise resolving to the order object or null if not found.
     */
    getOrderById(id: number): Promise<T | null>;

    /**
     * List all orders with optional filters.
     * @param filters - The filtering options for the orders.
     * @returns Promise resolving to a list of orders.
     */
    list(filters: F): Promise<TOrdersList>;
}

export default IFranchiseOrderController;
