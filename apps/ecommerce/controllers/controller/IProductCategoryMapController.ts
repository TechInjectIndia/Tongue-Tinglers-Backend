import { TQueryFilters, TProductCategoryLink } from '../../../../types';

/**
 * Interface for Product Category Map Controller.
 */
interface IProductCategoryMapController<T, F extends TQueryFilters> {
    /**
     * Assign a product to a category.
     * @param payload - The data linking the product and category.
     * @returns Promise resolving to the assigned mapping.
     */
    assign(payload: TProductCategoryLink): Promise<T>;

    /**
     * Get the mapping for a product and category.
     * @param productId - The ID of the product.
     * @param categoryId - The ID of the category.
     * @returns Promise resolving to the mapping or null if not found.
     */
    get(productId: number, categoryId: number): Promise<T>;

    /**
     * Unassign a product from a category.
     * @param productId - The ID of the product.
     * @param categoryId - The ID of the category.
     * @returns Promise resolving to the count of affected rows.
     */
    unassign(productId: number, categoryId: number): Promise<number>;
}

export default IProductCategoryMapController;
