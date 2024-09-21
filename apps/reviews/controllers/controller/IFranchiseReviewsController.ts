import { Response } from "express";
import { TQueryFilters, TAddFranchiseReviews, TReviewssList } from '../../../../types';

/**
 * Interface for Franchise Reviews Controller.
 */
interface IFranchiseReviewsController<T, F extends TQueryFilters> {
    /**
     * List franchise reviews for a specific user with filters.
     * @param user_id - The ID of the user whose reviews to list.
     * @param filters - Filtering options for the reviews.
     * @returns Promise resolving to a list of franchise reviews.
     */
    list(user_id: number, filters: F): Promise<TReviewssList>;

    /**
     * Get reviews by attribute.
     * @param whereName - The attribute name to filter by.
     * @param whereVal - The value of the attribute to filter.
     * @param getAttributes - The attributes to retrieve.
     * @returns Promise resolving to the review object or null if not found.
     */
    getReviewsByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<T | null>;

    /**
     * Create a new franchise review.
     * @param payload - The data to create the franchise review.
     * @returns Promise resolving to the created franchise review.
     */
    create(payload: TAddFranchiseReviews): Promise<T>;
}

export default IFranchiseReviewsController;
