import { NextFunction, Response } from "express";
import { TQueryFilters, TAddUser, TEditUser } from '../../../../types';

/**
 * Interface for Franchise Controller.
 */
interface IFranchiseController<T, F extends TQueryFilters> {
    /**
     * List franchises with filtering options.
     * @param filters - Filtering options.
     * @returns Promise resolving to an array of franchises.
     */
    list(filters: F): Promise<Response<T[]>>;

    /**
     * Get a franchise by ID.
     * @param id - The ID of the franchise.
     * @returns Promise resolving to the franchise object.
     */
    get(id: number): Promise<T>;

    /**
     * Create a new franchise.
     * @param payload - The data to create the franchise.
     * @returns Promise resolving to the created franchise.
     */
    create(payload: TAddUser): Promise<T>;

    /**
     * Update an existing franchise by ID.
     * @param id - The ID of the franchise to update.
     * @param payload - The data to update the franchise.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TEditUser): Promise<[affectedCount: number]>; 

    /**
     * Delete franchises by IDs.
     * @param ids - Array of franchise IDs to delete.
     * @param deletedBy - ID of the user performing the deletion.
     * @returns Promise resolving to the count of deleted franchises.
     */
    delete(ids: number[], deletedBy: number): Promise<number>;

    /**
     * Get a franchise by email.
     * @param email - The email of the franchise.
     * @returns Promise resolving to the franchise object.
     */
    getFranchiseByEmail(email: string): Promise<T>;

    /**
     * Retrieve a list of deleted franchises.
     * @param filters - Filtering options for deleted franchises.
     * @returns Promise resolving to an array of deleted franchises.
     */
    deletedList(filters: F): Promise<Response<T[]>>;
}

export default IFranchiseController;
