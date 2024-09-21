import { NextFunction, Response } from "express";
import { TQueryFilters, TPayloadTestimonials, TTestimonialsList } from '../../../../types';

/**
 * Interface for Testimonials Controller.
 */
interface ITestimonialsController<T, F extends TQueryFilters> {
    /**
     * List testimonials with filters.
     * @param filters - Filtering options for testimonials.
     * @returns Promise resolving to a list of testimonials.
     */
    list(filters: F): Promise<TTestimonialsList>;

    /**
     * Get testimonials by attribute.
     * @param whereName - The attribute name to filter by.
     * @param whereVal - The value of the attribute to filter.
     * @param getAttributes - The attributes to retrieve.
     * @returns Promise resolving to the testimonial object or null if not found.
     */
    getTestimonialsByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<T | null>;

    /**
     * Create a new testimonial.
     * @param payload - The data to create the testimonial.
     * @returns Promise resolving to the created testimonial.
     */
    create(payload: TPayloadTestimonials): Promise<T>;

    /**
     * Update an existing testimonial by ID.
     * @param id - The ID of the testimonial to update.
     * @param payload - The data to update the testimonial.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TPayloadTestimonials): Promise<[affectedCount: number]>;

    /**
     * Delete testimonials by IDs.
     * @param ids - Array of testimonial IDs to delete.
     * @returns Promise resolving to the count of deleted testimonials.
     */
    delete(ids: number[]): Promise<number>;
}

export default ITestimonialsController;
