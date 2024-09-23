import { TQueryFilters, TMenuProductsList, TPayloadMenuProduct } from '../../../../types';

/**
 * Interface for Menu Product Controller.
 */
interface IMenuProductController<T, F extends TQueryFilters> {
    /**
     * Get a menu product by ID.
     * @param id - The ID of the menu product.
     * @returns Promise resolving to the menu product or null if not found.
     */
    get(id: number): Promise<T | null>;

    /**
     * Create a new menu product.
     * @param payload - The data to create the menu product.
     * @returns Promise resolving to the created menu product.
     */
    create(payload: TPayloadMenuProduct): Promise<T>;

    /**
     * List menu products with filters.
     * @param filters - The filtering options.
     * @returns Promise resolving to a list of menu products.
     */
    list(filters: F): Promise<TMenuProductsList>;

    /**
     * Update an existing menu product by ID.
     * @param id - The ID of the menu product to update.
     * @param payload - The data to update the menu product.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TPayloadMenuProduct): Promise<[affectedCount: number]>;

    /**
     * Delete menu products by IDs.
     * @param ids - The IDs of the menu products to delete.
     * @returns Promise resolving to the count of deleted menu products.
     */
    delete(ids: number[]): Promise<number>;

    /**
     * Get a menu product by specific attribute.
     * @param whereName - The attribute name to filter by.
     * @param whereVal - The value to match against the attribute.
     * @param getAttributes - The attributes to retrieve.
     * @returns Promise resolving to the menu product or null if not found.
     */
    getMenuProductByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<T | null>;
}

export default IMenuProductController;
