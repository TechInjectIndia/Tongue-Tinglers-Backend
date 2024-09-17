import { Response } from "express";
import { TQueryFilters, TPayloadTestimonials, TTestimonialsList } from '../../../../types'

interface ITestimonialsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<TTestimonialsList>;
    getTestimonialsByAttr(whereName: any, whereVal: any, getAttributes: any): Promise<T>;
    create(payload: TPayloadTestimonials): Promise<T>;
    update(id: number, payload: TPayloadTestimonials): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
}

export default ITestimonialsController;
