import { TQueryFilters, TEditUser } from "../../../types";

/**
 * Interface for Franchise Controller.
 */
interface IFranchiseController<T, P, F extends TQueryFilters> {
    /**
     * List franchises with filtering options.
     * @param filters - Filtering options.
     * @returns Promise resolving to an array of franchises.
     */
    list(filters: F): Promise<P[]>;

    /**
     * Get a franchise by ID.
     * @param id - The ID of the franchise.
     * @returns Promise resolving to the franchise object.
     */
    get(id: number): Promise<P>;

    /**
     * Create a new franchise.
     * @param payload - The data to create the franchise.
     * @returns Promise resolving to the created franchise.
     */
    create(payload: T): Promise<P>;

    /**
     * Update an existing franchise by ID.
     * @param id - The ID of the franchise to update.
     * @param payload - The data to update the franchise.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: T): Promise<[affectedCount: number]>;

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
    getFranchiseByEmail(email: string): Promise<P>;

    /**
     * Retrieve a list of deleted franchises.
     * @param filters - Filtering options for deleted franchises.
     * @returns Promise resolving to an array of deleted franchises.
     */
    deletedList(filters: F): Promise<P[]>;
}

export default IFranchiseController;
