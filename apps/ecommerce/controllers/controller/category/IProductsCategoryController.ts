import { Response } from "express";
import { TQueryFilters, TAddProductCategory, TEditProductCategory, TProductCategorysList } from '../../../../../types';

/**
 * Interface for Product Categories Controller.
 */
interface IProductsCategorysController<T, F extends TQueryFilters> {
    /**
     * Get a product category by its name.
     * @param name - The name of the product category.
     * @returns Promise resolving to the product category object.
     */
    getProductCategoryByName(name: string): Promise<T>;

    /**
     * Get a product category by ID.
     * @param id - The ID of the product category.
     * @returns Promise resolving to the product category object.
     */
    get(id: number): Promise<T>;

    /**
     * List product categories with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to a list of product categories.
     */
    list(filters: F): Promise<TProductCategorysList>;

    /**
     * Create a new product category.
     * @param payload - The data to create the product category.
     * @returns Promise resolving to the created product category.
     */
    create(payload: TAddProductCategory): Promise<T>;

    /**
     * Update an existing product category by ID.
     * @param id - The ID of the product category to update.
     * @param payload - The data to update the product category.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TEditProductCategory): Promise<[affectedCount: number]>; 

    /**
     * Delete product categories by IDs.
     * @param ids - Array of product category IDs to delete.
     * @returns Promise resolving to the count of deleted categories.
     */
    delete(ids: number[]): Promise<number>;
}

export default IProductsCategorysController;
