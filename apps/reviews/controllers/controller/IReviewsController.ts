import { Response } from "express";
import { TQueryFilters, TAddReviews, TReviewssList } from '../../../../types';

/**
 * Interface for Reviews Controller.
 */
interface IReviewsController<T, F extends TQueryFilters> {
    /**
     * List reviews with filters.
     * @param filters - Filtering options for reviews.
     * @returns Promise resolving to a list of reviews.
     */
    list(filters: F): Promise<TReviewssList>;

    /**
     * Get reviews by attribute.
     * @param whereName - The attribute name to filter by.
     * @param whereVal - The value of the attribute to filter.
     * @param getAttributes - The attributes to retrieve.
     * @returns Promise resolving to the review object or null if not found.
     */
    getReviewsByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<T | null>;

    /**
     * Create a new review.
     * @param payload - The data to create the review.
     * @returns Promise resolving to the created review.
     */
    create(payload: TAddReviews): Promise<T>;

    /**
     * Update an existing review by ID.
     * @param id - The ID of the review to update.
     * @param payload - The data to update the review.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TAddReviews): Promise<[affectedCount: number]>; 

    /**
     * Delete reviews by IDs.
     * @param ids - Array of review IDs to delete.
     * @returns Promise resolving to the count of deleted reviews.
     */
    delete(ids: number[]): Promise<number>;
}

export default IReviewsController;
