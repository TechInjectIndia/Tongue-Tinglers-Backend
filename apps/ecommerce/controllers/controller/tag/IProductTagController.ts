import { Response } from "express";
import { TQueryFilters, TAddProductTag, TEditProductTag, TProductTagsList } from '../../../../../types';

/**
 * Interface for Product Tag Controller.
 */
interface IProductTagController<T, F extends TQueryFilters> {
    /**
     * Get a product tag by its name.
     * @param name - The name of the product tag.
     * @returns Promise resolving to the product tag object or null if not found.
     */
    getTagByName(name: string): Promise<T>;

    /**
     * Get a product tag by its ID.
     * @param id - The ID of the product tag.
     * @returns Promise resolving to the product tag object or null if not found.
     */
    get(id: number): Promise<T>;

    /**
     * List product tags with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to a list of product tags.
     */
    list(filters: F): Promise<TProductTagsList>;

    /**
     * Create a new product tag.
     * @param payload - The data to create the product tag.
     * @returns Promise resolving to the created product tag.
     */
    create(payload: TAddProductTag): Promise<T>;

    /**
     * Update an existing product tag by ID.
     * @param id - The ID of the product tag to update.
     * @param payload - The data to update the product tag.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TEditProductTag): Promise<[affectedCount: number]>;

    /**
     * Delete product tags by IDs.
     * @param ids - Array of product tag IDs to delete.
     * @returns Promise resolving to the count of deleted product tags.
     */
    delete(ids: number[]): Promise<number>;
}

export default IProductTagController;
