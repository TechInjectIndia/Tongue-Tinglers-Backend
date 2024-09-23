import { Response } from "express";
import { TQueryFilters, TAddFranchise, TEditFranchise } from '../../../../../types';

/**
 * Interface for Franchise Controller.
 */
interface IFranchiseController<T, F extends TQueryFilters> {
    /**
     * Get a franchise by ID.
     * @param id - The ID of the franchise.
     * @returns Promise resolving to the franchise object.
     */
    get(id: number): Promise<T>;

    /**
     * List franchises with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to a response containing an array of franchises.
     */
    list(filters: F): Promise<Response<T[]>>;

    /**
     * Create a new franchise.
     * @param payload - The data to create the franchise.
     * @returns Promise resolving to the created franchise object.
     */
    create(payload: TAddFranchise): Promise<T>;

    /**
     * Update an existing franchise by ID.
     * @param id - The ID of the franchise to update.
     * @param payload - The data to update the franchise.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TEditFranchise): Promise<[affectedCount: number]>;

    /**
     * Delete franchises by IDs.
     * @param ids - Array of franchise IDs to delete.
     * @returns Promise resolving to the deleted franchise object(s).
     */
    delete(ids: number[]): Promise<T>;
}

export default IFranchiseController;
