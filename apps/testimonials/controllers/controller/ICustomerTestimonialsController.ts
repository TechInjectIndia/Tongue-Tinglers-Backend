import { Response } from "express";
import { TQueryFilters, TPayloadTestimonials, TTestimonialsList } from '../../../../types';

/**
 * Interface for Customer Testimonials Controller.
 */
interface ICustomerTestimonialsController<T, F extends TQueryFilters> {
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

    /**
     * Create a new testimonial.
     * @param payload - The data for the new testimonial.
     * @returns Promise resolving to the created testimonial object.
     */
    create(payload: TPayloadTestimonials): Promise<T>;
}

export default ICustomerTestimonialsController;
