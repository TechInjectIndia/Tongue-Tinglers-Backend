import { Response } from "express";
import { TQueryFilters, TAddTestimonials } from '../../../../types'

interface ITestimonialsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    // create(payload: TAddTestimonials): Promise<Response<T>>;
    getTestimonialsByAttr(whereName: any, whereVal: any, getAttributes: any): Promise<Response<T>>;
}

export default ITestimonialsController;
