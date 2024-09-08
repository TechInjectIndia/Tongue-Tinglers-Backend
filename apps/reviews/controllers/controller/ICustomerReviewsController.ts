import { Response } from "express";
import { TQueryFilters, TAddCustomerReviews, TReviewssList } from '../../../../types'

interface ICustomerReviewsController<T, F extends TQueryFilters> {
    list(user_id: number, filters: F): Promise<TReviewssList>;
    getReviewsByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<T>;
    create(payload: TAddCustomerReviews): Promise<T>;
}

export default ICustomerReviewsController;
