import { Response } from "express";
import { TQueryFilters, TAddFranchiseReviews } from '../../../../types'

interface IFranchiseReviewsController<T, F extends TQueryFilters> {
    list(user_id: number, filters: F): Promise<Response<T[]>>;
    getReviewsByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<Response<T>>;
    create(payload: TAddFranchiseReviews): Promise<Response<T>>;
}

export default IFranchiseReviewsController;
