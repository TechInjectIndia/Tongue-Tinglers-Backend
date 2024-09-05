import { Response } from "express";
import { TQueryFilters, TReviewssList } from '../../../../types'

interface IReviewsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<TReviewssList>;
}

export default IReviewsController;
