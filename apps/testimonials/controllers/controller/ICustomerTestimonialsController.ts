import { Response } from "express";
import { TQueryFilters, TAddTestimonials, TTestimonialsList } from '../../../../types'

interface ICustomerTestimonialsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<TTestimonialsList>;
    getTestimonialsByAttr(whereName: any, whereVal: any, getAttributes: any): Promise<T>;
    create(payload: TAddTestimonials): Promise<T>;
}

export default ICustomerTestimonialsController;
