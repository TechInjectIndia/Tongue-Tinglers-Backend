import { Response } from "express";
import { TQueryFilters, TTestimonialsList } from '../../../../types';

/**
 * Interface for Testimonials Controller.
 */
interface ITestimonialsController<T, F extends TQueryFilters> {
    /**
     * Retrieve a list of testimonials with optional filters.
     * @param filters - The filtering options for the testimonials.
     * @returns Promise resolving to a list of testimonials.
     */
    list(filters: F): Promise<TTestimonialsList>;

    /**
     * Get testimonials by a specific attribute.
     * @param whereName - The attribute name to filter by.
     * @param whereVal - The value of the attribute to filter by.
     * @param getAttributes - The attributes to retrieve from the filtered testimonials.
     * @returns Promise resolving to the testimonials matching the criteria.
     */
    getTestimonialsByAttr(whereName: any, whereVal: any, getAttributes: any): Promise<T>;
}

export default ITestimonialsController;
