import { TQueryFilters, TEmail, TAddEmail, TEmailsList, TEditEmail, TAssignCampaign } from '../../../../types';

/**
 * Interface for Email Controller.
 */
interface IEmailController<T, F extends TQueryFilters> {
    /**
     * Get an email by its ID.
     * @param id - The ID of the email.
     * @returns Promise resolving to the email or null if not found.
     */
    get(id: number): Promise<T | null>;

    /**
     * Create a new email.
     * @param payload - The data to create the email.
     * @returns Promise resolving to the created email.
     */
    create(payload: TAddEmail): Promise<T>;

    /**
     * List emails with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to a list of emails.
     */
    list(filters: F): Promise<TEmailsList>;

    /**
     * Update an existing email.
     * @param id - The ID of the email to update.
     * @param campaignId - The ID of the campaign associated with the email.
     * @param subscriberId - The ID of the subscriber related to the email.
     * @param payload - The data to update the email.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, campaignId: number, subscriberId: number, payload: TEditEmail): Promise<[affectedCount: number]>;
}

export default IEmailController;
