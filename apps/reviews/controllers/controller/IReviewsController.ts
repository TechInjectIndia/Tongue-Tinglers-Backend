import { Response } from "express";
import { TQueryFilters, TAddReviews, TEditReviews, TReviewssList } from '../../../../types'

interface IReviewsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<TReviewssList>;
    getReviewsByAttr(whereName: any, whereVal: any, getAttributes: any): Promise<T>;
    create(payload: TAddReviews): Promise<T>;
    update(id: number, payload: TEditReviews): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
}

export default IReviewsController;