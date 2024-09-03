import { Response } from "express";
import { TQueryFilters, TAddReviews } from '../../../../types'

interface IReviewsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    // create(payload: TAddReviews): Promise<Response<T>>;
    getReviewsByAttr(whereName: any, whereVal: any, getAttributes: any): Promise<Response<T>>;
}

export default IReviewsController;
