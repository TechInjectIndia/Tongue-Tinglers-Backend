import { Response } from "express";
import { TQueryFilters, TOrdersList, TEditOrder, TAddOrder } from '../../../../types';

/**
 * Interface for Orders Controller.
 */
interface IOrdersController<T, F extends TQueryFilters> {
    /**
     * Retrieve an order by its ID.
     * @param id - The ID of the order to retrieve.
     * @returns Promise resolving to the order object or null if not found.
     */
    get(id: number): Promise<T | null>;

    /**
     * Get the current status of an order by its ID.
     * @param id - The ID of the order to check status.
     * @returns Promise resolving to the order status object or null if not found.
     */
    orderStatus(id: number): Promise<T | null>;

    /**
     * Create a new order.
     * @param payload - The data for the new order.
     * @returns Promise resolving to the created order object.
     */
    create(payload: TAddOrder): Promise<T>;

    /**
     * List all orders with optional filters.
     * @param filters - The filtering options for the orders.
     * @returns Promise resolving to a list of orders.
     */
    list(filters: F): Promise<TOrdersList>;

    /**
     * Update an existing order by ID.
     * @param id - The ID of the order to update.
     * @param payload - The updated data for the order.
     * @returns Promise resolving to an array containing the count of affected rows.
     */
    update(id: number, payload: TEditOrder): Promise<[affectedCount: number]>;
}

export default IOrdersController;
