import { Response } from "express";
import { TQueryFilters, TReviewssList } from '../../../../types';

/**
 * Interface for Reviews Controller.
 */
interface IReviewsController<T, F extends TQueryFilters> {
    /**
     * List reviews with filters.
     * @param filters - Filtering options for the reviews.
     * @returns Promise resolving to a list of reviews.
     */
    list(filters: F): Promise<TReviewssList>;
}

export default IReviewsController;
