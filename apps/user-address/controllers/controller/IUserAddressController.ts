// Generic interface for User Address repository operations
export default interface IUserAddressController<T, F> {
    list(userId: number): Promise<T[]>

    /**
     * Create a new entry
     * @param payload - The data for creating the entry
     * @returns A promise resolving to the created entry
     */
    create(payload: Partial<T>): Promise<T>;

    /**
     * Find an entry by ID
     * @param id - The ID of the entry to find
     * @returns A promise resolving to the entry or null if not found
     */
    findById(id: number, userId: number): Promise<T | null>;

    /**
     * Update an entry by ID
     * @param id - The ID of the entry to update
     * @param payload - The data for updating the entry
     * @returns A promise resolving to the updated entry or null if not found
     */
    updateById(id: number, payload: Partial<T>): Promise<T | null>;

    /**
     * Delete an entry by ID
     * @param id - The ID of the entry to delete
     * @returns A promise resolving to true if deletion was successful, false if not found
     */
    deleteById(id: number): Promise<boolean>;
}
