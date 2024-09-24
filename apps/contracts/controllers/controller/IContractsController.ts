import { TQueryFilters } from '../../../../types';

/**
 * Interface for Contracts Controller.
 */
interface IContractsController<T, F extends TQueryFilters> {
    /**
    * Update the document associated with a contract.
    * @param contractId - The ID of the contract to update.
    * @param docData - The document data to update in the contract.
    * @returns Promise resolving to the updated contract.
    */
    updateContractDoc(contractId: string, docData: any): Promise<T>;

    /**
     * Create a new contract.
     * @param data - The data for the new contract.
     * @returns Promise resolving to the created contract.
     */
    create(data: T): Promise<T>;

    /**
     * Get a contract by ID.
     * @param id - The ID of the contract.
     * @returns Promise resolving to the contract or null if not found.
     */
    get(id: string): Promise<T | null>;

    /**
     * List contracts with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to an object containing total count and list of contracts.
     */
    list(filters: F): Promise<{ total: number; data: T[] }>;

    /**
     * Update an existing contract by ID.
     * @param id - The ID of the contract to update.
     * @param data - The data to update the contract.
     * @returns Promise resolving to the affected count.
     */
    update(id: string, data: Partial<T>): Promise<[affectedCount: number]>;

    /**
     * Delete contracts by IDs.
     * @param ids - Array of contract IDs to delete.
     * @returns Promise resolving to the count of deleted contracts.
     */
    delete(ids: string[]): Promise<number>;
}

export default IContractsController;
