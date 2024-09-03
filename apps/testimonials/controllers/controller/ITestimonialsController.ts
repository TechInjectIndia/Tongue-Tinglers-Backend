import { Response } from "express";
import { TQueryFilters, TAddTestimonials, TEditTestimonials } from '../../../../types'

interface ITestimonialsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    getTestimonialsByAttr(whereName: any, whereVal: any, getAttributes: any): Promise<Response<T>>;
    create(payload: TAddTestimonials): Promise<Response<T>>;
    update(id: number, payload: TEditTestimonials): Promise<Response<T>>;
    delete(ids: number[]): Promise<Response<T>>;
}

export default ITestimonialsController;
