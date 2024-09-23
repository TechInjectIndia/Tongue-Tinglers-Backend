import { Response } from "express";
import { TQueryFilters, TAddProduct, TEditProduct, TProductsList } from '../../../../../types';

/**
 * Interface for Products Controller.
 */
interface IProductsController<T, F extends TQueryFilters> {
    /**
     * Get a product by ID.
     * @param id - The ID of the product.
     * @returns Promise resolving to the product object.
     */
    get(id: number): Promise<T>;

    /**
     * List products with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to a list of products.
     */
    list(filters: F): Promise<TProductsList>;

    /**
     * Create a new product.
     * @param payload - The data to create the product.
     * @returns Promise resolving to the created product object.
     */
    create(payload: TAddProduct): Promise<T>;

    /**
     * Update an existing product by ID.
     * @param id - The ID of the product to update.
     * @param payload - The data to update the product.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TEditProduct): Promise<[affectedCount: number]>;

    /**
     * Delete products by IDs.
     * @param ids - Array of product IDs to delete.
     * @returns Promise resolving to the count of deleted products.
     */
    delete(ids: number[]): Promise<number>;
}

export default IProductsController;
