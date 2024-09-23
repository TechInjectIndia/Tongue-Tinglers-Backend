import { TQueryFilters, TAddInquiry, TInquirysList, TEditInquiry } from '../../../../types';

/**
 * Interface for Inquiry Controller.
 */
interface IInquiryController<T, F extends TQueryFilters> {
    /**
     * Get an inquiry by its ID.
     * @param id - The ID of the inquiry.
     * @returns Promise resolving to the inquiry or null if not found.
     */
    get(id: number): Promise<T | null>;

    /**
     * Create a new inquiry.
     * @param payload - The data to create the inquiry.
     * @returns Promise resolving to the created inquiry.
     */
    create(payload: TAddInquiry): Promise<T>;

    /**
     * List inquiries with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to a list of inquiries.
     */
    list(filters: F): Promise<TInquirysList>;

    /**
     * Update an existing inquiry.
     * @param id - The ID of the inquiry to update.
     * @param payload - The data to update the inquiry.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TEditInquiry): Promise<[affectedCount: number]>;
}

export default IInquiryController;
