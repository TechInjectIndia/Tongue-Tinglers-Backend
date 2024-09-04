import { Response } from "express";
import { TQueryFilters, TAddReviews } from '../../../../types'

interface IReviewsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
}

export default IReviewsController;
