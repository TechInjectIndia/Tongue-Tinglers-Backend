import { Response } from "express";
import { TQueryFilters, TAddReviews, TEditReviews } from '../../../../types'

interface IReviewsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    getReviewsByAttr(whereName: any, whereVal: any, getAttributes: any): Promise<Response<T>>;
    create(payload: TAddReviews): Promise<Response<T>>;
    update(id: number, payload: TEditReviews): Promise<Response<T>>;
    delete(ids: number[]): Promise<Response<T>>;
}

export default IReviewsController;
