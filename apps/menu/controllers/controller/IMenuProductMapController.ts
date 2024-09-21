import { TQueryFilters } from '../../../../types';

/**
 * Interface for Menu Product Map Controller.
 */
interface IMenuProductMapController<T, F extends TQueryFilters> {
    /**
     * Assign a category to a product.
     * @param categoryId - The ID of the category to assign.
     * @param productId - The ID of the product to which the category will be assigned.
     * @returns Promise resolving to the affected count.
     */
    assign(categoryId: number, productId: number): Promise<[affectedCount: number]>;

    /**
     * Unassign a category from a product.
     * @param productId - The ID of the product from which the category will be unassigned.
     * @returns Promise resolving to the affected count.
     */
    unassign(productId: number): Promise<[affectedCount: number]>;
}

export default IMenuProductMapController;
