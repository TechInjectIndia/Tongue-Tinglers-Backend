import { Response } from "express";
import { TQueryFilters, TAddRetortProductCategory, TEditRetortProductCategory, TRetortProductCategorysList } from '../../../../../types';

/**
 * Interface for Retort Product Categories Controller.
 */
interface IRetortProductsCategorysController<T, F extends TQueryFilters> {
    /**
     * Retrieve a retort product category by its name.
     * @param name - The name of the category.
     * @returns Promise resolving to the category object.
     */
    getRetortProductCategoryByName(name: string): Promise<T>;

    /**
     * Get a retort product category by its ID.
     * @param id - The ID of the category.
     * @returns Promise resolving to the category object or null.
     */
    get(id: number): Promise<T | null>;

    /**
     * List retort product categories with filters.
     * @param filters - The filtering options.
     * @returns Promise resolving to a list of categories.
     */
    list(filters: F): Promise<TRetortProductCategorysList>;

    /**
     * Create a new retort product category.
     * @param payload - The data to create the category.
     * @returns Promise resolving to the created category.
     */
    create(payload: TAddRetortProductCategory): Promise<T>;

    /**
     * Update an existing retort product category.
     * @param id - The ID of the category to update.
     * @param payload - The updated data for the category.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TEditRetortProductCategory): Promise<[affectedCount: number]>; 

    /**
     * Delete retort product categories by IDs.
     * @param ids - An array of category IDs to delete.
     * @returns Promise resolving to the count of deleted categories.
     */
    delete(ids: number[]): Promise<number>;
}

export default IRetortProductsCategorysController;
