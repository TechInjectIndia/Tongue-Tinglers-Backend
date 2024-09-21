import { Response } from "express";
import { TQueryFilters, TAddCustomerReviews, TReviewssList } from '../../../../types';

/**
 * Interface for Customer Reviews Controller.
 */
interface ICustomerReviewsController<T, F extends TQueryFilters> {
    /**
     * List customer reviews for a specific user with filters.
     * @param user_id - The ID of the user whose reviews to list.
     * @param filters - Filtering options for the reviews.
     * @returns Promise resolving to a list of customer reviews.
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
     * Create a new customer review.
     * @param payload - The data to create the customer review.
     * @returns Promise resolving to the created customer review.
     */
    create(payload: TAddCustomerReviews): Promise<T>;
}

export default ICustomerReviewsController;
