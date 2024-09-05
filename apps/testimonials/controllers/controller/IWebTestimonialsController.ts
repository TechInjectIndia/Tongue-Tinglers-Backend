import { Response } from "express";
import { TQueryFilters, TTestimonialsList } from '../../../../types'

interface ITestimonialsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<TTestimonialsList>;
    getTestimonialsByAttr(whereName: any, whereVal: any, getAttributes: any): Promise<T>;
}

export default ITestimonialsController;
