import { Response } from "express";
import { TQueryFilters, TAddCustomerReviews } from '../../../../types'

interface ICustomerReviewsController<T, F extends TQueryFilters> {
    list(user_id: number, filters: F): Promise<Response<T[]>>;
    getReviewsByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<Response<T>>;
    create(payload: TAddCustomerReviews): Promise<Response<T>>;
}

export default ICustomerReviewsController;
