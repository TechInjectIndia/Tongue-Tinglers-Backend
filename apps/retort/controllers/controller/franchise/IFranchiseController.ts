import { Response } from "express";
import { TQueryFilters, TAddFranchise, TEditFranchise } from '../../../../../types';

/**
 * Interface for Franchise Controller.
 */
interface IFranchiseController<T, F extends TQueryFilters> {
    /**
     * Get a franchise by its ID.
     * @param id - The ID of the franchise.
     * @returns Promise resolving to the franchise object.
     */
    get(id: number): Promise<T>;

    /**
     * List franchises with filters.
     * @param filters - The filtering options.
     * @returns Promise resolving to an array of franchises.
     */
    list(filters: F): Promise<Response<T[]>>;

    /**
     * Create a new franchise.
     * @param payload - The data to create the franchise.
     * @returns Promise resolving to the created franchise object.
     */
    create(payload: TAddFranchise): Promise<T>;

    /**
     * Update an existing franchise.
     * @param id - The ID of the franchise to update.
     * @param payload - The updated data for the franchise.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TEditFranchise): Promise<[affectedCount: number]>;

    /**
     * Delete franchises by IDs.
     * @param ids - An array of franchise IDs to delete.
     * @returns Promise resolving to the deleted franchise object.
     */
    delete(ids: number[]): Promise<T>;
}

export default IFranchiseController;
