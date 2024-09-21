import { NextFunction, Response } from "express";
import { TQueryFilters, TPayloadAddress, TAddress, TAddresssList } from '../../../../types';

/**
 * Interface for Address Controller.
 */
interface IAddressController<T, F extends TQueryFilters> {
    /**
     * List addresses for a user with filters.
     * @param user_id - The ID of the user.
     * @param filters - Filtering options for the addresses.
     * @returns Promise resolving to a list of addresses.
     */
    list(user_id: number, filters: F): Promise<TAddresssList>;

    /**
     * Get a specific address by ID for a user.
     * @param id - The ID of the address.
     * @param user_id - The ID of the user.
     * @returns Promise resolving to the address object.
     */
    get(id: number, user_id: number): Promise<T>;

    /**
     * Create a new address.
     * @param payload - The data to create the address.
     * @returns Promise resolving to the created address.
     */
    create(payload: TPayloadAddress): Promise<T>;

    /**
     * Update an existing address for a user.
     * @param user_id - The ID of the user.
     * @param id - The ID of the address to update.
     * @param payload - The data to update the address.
     * @returns Promise resolving to the affected count.
     */
    update(user_id: number, id: number, payload: TPayloadAddress): Promise<[affectedCount: number]>; 

    /**
     * Delete addresses by IDs for a user.
     * @param user_id - The ID of the user.
     * @param ids - Array of address IDs to delete.
     * @param deletedBy - The ID of the user who deleted the addresses.
     * @returns Promise resolving to the count of deleted addresses.
     */
    delete(user_id: number, ids: number[], deletedBy: number): Promise<number>;
}

export default IAddressController;
