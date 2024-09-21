import { TQueryFilters, TMenu, TEditMenu, TMenusList, TAddMenu } from '../../../../types';

/**
 * Interface for Menu Controller.
 */
interface IMenuController<T, F extends TQueryFilters> {
    /**
     * Create a new menu.
     * @param payload - The data to create the menu.
     * @returns Promise resolving to the created menu.
     */
    create(payload: TAddMenu): Promise<T>;

    /**
     * List menus with filters.
     * @param filters - The filtering options.
     * @returns Promise resolving to a list of menus.
     */
    list(filters: F): Promise<TMenusList>;

    /**
     * Update an existing menu by ID.
     * @param id - The ID of the menu to update.
     * @param payload - The data to update the menu.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TEditMenu): Promise<[affectedCount: number]>;

    /**
     * Delete menus by IDs.
     * @param ids - The IDs of the menus to delete.
     * @returns Promise resolving to the count of deleted menus.
     */
    delete(ids: number[]): Promise<number>;

    /**
     * Get a menu by ID.
     * @param id - The ID of the menu.
     * @returns Promise resolving to the menu or null if not found.
     */
    get(id: number): Promise<T>;

    /**
     * Get a menu by name.
     * @param name - The name of the menu.
     * @returns Promise resolving to the menu or null if not found.
     */
    getMenuByName(name: string): Promise<T>;
}

export default IMenuController;
