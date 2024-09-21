import { TQueryFilters, TMenuCategoryRelation } from '../../../../types';

/**
 * Interface for Menu Category Map Controller.
 */
interface IMenuCategoryMapController<T, F extends TQueryFilters> {
    /**
     * Get the relation between a menu and a category.
     * @param menuId - The ID of the menu.
     * @param categoryId - The ID of the category.
     * @returns Promise resolving to the relation or null if not found.
     */
    get(menuId: number, categoryId: number): Promise<T | null>;

    /**
     * Assign a category to a menu.
     * @param payload - The data to create the menu-category relation.
     * @returns Promise resolving to the created relation.
     */
    assign(payload: TMenuCategoryRelation): Promise<T>;

    /**
     * Unassign a category from a menu.
     * @param menuId - The ID of the menu.
     * @param categoryId - The ID of the category.
     * @returns Promise resolving to the count of affected rows.
     */
    unassign(menuId: number, categoryId: number): Promise<number>;
}

export default IMenuCategoryMapController;
