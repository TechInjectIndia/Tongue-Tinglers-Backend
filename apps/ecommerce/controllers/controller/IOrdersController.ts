import { Response } from "express";
import { TQueryFilters, TOrdersList, TOrderPayload } from '../../../../types';

/**
 * Interface for Orders Controller.
 */
interface IOrdersController<T, F extends TQueryFilters> {
    /**
     * Get an order by its ID.
     * @param id - The ID of the order.
     * @returns Promise resolving to the order.
     */
    get(id: string): Promise<T>;

    /**
     * Get the status of an order by its ID.
     * @param id - The ID of the order.
     * @returns Promise resolving to the order's status.
     */
    orderStatus(id: string): Promise<T>;

    /**
     * Create a new order.
     * @param payload - The data to create the order.
     * @returns Promise resolving to the created order.
     */
    create(payload: TOrderPayload): Promise<T>;

    /**
     * List orders with filters.
     * @param filters - The filtering options.
     * @returns Promise resolving to a list of orders.
     */
    list(filters: F): Promise<TOrdersList>;

    /**
     * Update an existing order by ID.
     * @param id - The ID of the order to update.
     * @param payload - The data to update the order.
     * @returns Promise resolving to the affected count.
     */
    update(id: string, payload: TOrderPayload): Promise<[affectedCount: number]>;
}

export default IOrdersController;
