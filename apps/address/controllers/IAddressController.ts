import { TListFilters } from "../../../types";

// Generic interface for User Address repository operations
export default interface IAddress<T, P, F> {
    list(filters: TListFilters): Promise<T[]>;

    /**
     * Create a new entry
     * @param payload - The data for creating the entry
     * @returns A promise resolving to the created entry
     */
    create(payload: Partial<T>, userId: number, options?: { transaction?: any }): Promise<P>;

    /**
     * Find an entry by ID
     * @param id - The ID of the entry to find
     * @returns A promise resolving to the entry or null if not found
     */
    findById(id: number): Promise<P | null>;

    /**
     * Update an entry by ID
     * @param id - The ID of the entry to update
     * @param payload - The data for updating the entry
     * @returns A promise resolving to the updated entry or null if not found
     */
    updateById(id: number, payload: Partial<T>, userId: number): Promise<P | null>;

    /**
     * Delete an entry by ID
     * @param id - The ID of the entry to delete
     * @returns A promise
     * resolving to true if deletion was successful, false if not found
     */
    deleteById(id: number): Promise<boolean>;
}
