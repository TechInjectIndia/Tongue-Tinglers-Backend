import { TQueryFilters, TOrderItem } from '../../../../types';

/**
 * Interface for Order Items Controller.
 */
interface IOrderItemsController<T, F extends TQueryFilters> {
    /**
     * Check for repeated orders for a specific user and product.
     * @param userId - The ID of the user.
     * @param productId - The ID of the product.
     * @returns Promise resolving to the order item if found, otherwise null.
     */
    checkRepeatedOrder(userId: number, productId: number): Promise<T>;

    /**
     * Create a new order item.
     * @param payload - The data to create the order item.
     * @returns Promise resolving to the created order item.
     */
    create(payload: TOrderItem): Promise<T>;
}

export default IOrderItemsController;
