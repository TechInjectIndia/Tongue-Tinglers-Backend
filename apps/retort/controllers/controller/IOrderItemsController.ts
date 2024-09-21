import { TQueryFilters, TOrderItem } from '../../../../types';

/**
 * Interface for Order Items Controller.
 */
interface IOrderItemsController<T, F extends TQueryFilters> {
    /**
     * Create a new order item.
     * @param payload - The data for the order item to be created.
     * @returns Promise resolving to the created order item object.
     */
    create(payload: TOrderItem): Promise<T>;
}

export default IOrderItemsController;
