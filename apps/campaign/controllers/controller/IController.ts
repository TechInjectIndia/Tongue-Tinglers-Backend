
import { TQueryFilters } from "../../../../types";
import {
    CampaignPayload,
    TCampaignList,
} from "../../interface/campaign";



interface IDynamicFormController<T, F extends TQueryFilters> {
    /**
     * List dynamic form questions for a user with filters.
     * @param filters - Filtering options for the dynamic form questions.
     * @returns Promise resolving to a list of dynamic form questions.
     */
    list(filters: F): Promise<TCampaignList>;

    /**
     * Get a specific dynamic form question by ID for a user.
     * @param id - The ID of the dynamic form question.
     * @returns Promise resolving to the dynamic form question object.
     */
    get(id: number): Promise<T | null>;

    /**
     * Create a new dynamic form question.
     * @param payload - The data to create the dynamic form question.
     * @param createdBy
     * @returns Promise resolving to the created dynamic form question.
     */
    create(payload: CampaignPayload, createdBy: number): Promise<T>;

    /**
     * Update an existing dynamic form question for a user.
     * @param id - The ID of the dynamic form question to update.
     * @param payload - The data to update the dynamic form question.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: CampaignPayload): Promise<[affectedCount: number]>;

    /**
     * Delete dynamic form questions by IDs for a user.
     * @param ids - Array of dynamic form question IDs to delete.
     * @param deletedBy - The ID of the user who deleted the dynamic form questions.
     * @returns Promise resolving to the count of deleted dynamic form questions.
     */
    delete(ids: number[], deletedBy: string): Promise<number>;
}

export default IDynamicFormController;
