import { Response } from "express";
import { TQueryFilters, TAddFranchiseReviews, TReviewssList } from '../../../../types'

interface IFranchiseReviewsController<T, F extends TQueryFilters> {
    list(user_id: number, filters: F): Promise<TReviewssList>;
    getReviewsByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<T>;
    create(payload: TAddFranchiseReviews): Promise<T>;
}

export default IFranchiseReviewsController;
