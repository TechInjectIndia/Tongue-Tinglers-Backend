import { NextFunction, Response } from "express";
import { TPayloadAffiliate, Affiliate, AffiliatesList } from '../../../../interfaces';
import { TQueryFilters } from '../../../../types';

/**
 * Interface for Affiliate Controller.
 */
interface IAffiliateController<T, F extends TQueryFilters> {
    /**
     * List Affiliatees for a user with filters.
     * @param user_id - The ID of the user.
     * @param filters - Filtering options for the Affiliatees.
     * @returns Promise resolving to a list of Affiliatees.
     */
    list(filters: F): Promise<AffiliatesList>;

    /**
     * Get a specific Affiliate by ID for a user.
     * @param id - The ID of the Affiliate.
     * @param user_id - The ID of the user.
     * @returns Promise resolving to the Affiliate object.
     */
    get(id: number, user_id: number): Promise<T | null>;

    /**
     * Create a new Affiliate.
     * @param payload - The data to create the Affiliate.
     * @returns Promise resolving to the created Affiliate.
     */
    create(payload: TPayloadAffiliate): Promise<T>;

    /**
     * Update an existing Affiliate for a user.
     * @param user_id - The ID of the user.
     * @param id - The ID of the Affiliate to update.
     * @param payload - The data to update the Affiliate.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TPayloadAffiliate): Promise<[affectedCount: number]>;

    /**
     * Delete Affiliatees by IDs for a user.
     * @param user_id - The ID of the user.
     * @param ids - Array of Affiliate IDs to delete.
     * @param deletedBy - The ID of the user who deleted the Affiliatees.
     * @returns Promise resolving to the count of deleted Affiliatees.
     */
    delete(ids: number[], deletedBy: number): Promise<number>;
}

export default IAffiliateController;
