import { Response } from "express";
import { TQueryFilters, TPayloadTestimonials, TTestimonialsList } from '../../../../types'

interface IFranchiseTestimonialsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<TTestimonialsList>;
    getTestimonialsByAttr(whereName: any, whereVal: any, getAttributes: any): Promise<T>;
    create(payload: TPayloadTestimonials): Promise<T>;
}

export default IFranchiseTestimonialsController;
