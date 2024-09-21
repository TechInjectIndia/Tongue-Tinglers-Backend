import { TPayloadMenuCategory, TQueryFilters } from '../../../../types';

/**
 * Interface for Menu Category Controller.
 */
interface IMenuCategoryController<T, F extends TQueryFilters> {
    /**
     * Get a menu category by its ID.
     * @param id - The ID of the menu category.
     * @returns Promise resolving to the menu category or null if not found.
     */
    get(id: number): Promise<T | null>;

    /**
     * Create a new menu category.
     * @param payload - The data to create the menu category.
     * @returns Promise resolving to the created menu category.
     */
    create(payload: TPayloadMenuCategory): Promise<T>;

    /**
     * Update an existing menu category.
     * @param id - The ID of the menu category to update.
     * @param payload - The data to update the menu category.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TPayloadMenuCategory): Promise<[affectedCount: number]>; 

    /**
     * Delete menu categories by their IDs.
     * @param ids - Array of menu category IDs to delete.
     * @returns Promise resolving to the count of deleted categories.
     */
    delete(ids: number[]): Promise<number>;

    /**
     * Get a menu category by a specific attribute.
     * @param whereName - The attribute name to filter by.
     * @param whereVal - The value of the attribute.
     * @param getAttributes - Attributes to retrieve.
     * @returns Promise resolving to the menu category or null if not found.
     */
    getMenuCategoryByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<T | null>;
}

export default IMenuCategoryController;
