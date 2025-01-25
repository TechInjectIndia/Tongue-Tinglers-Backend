import { TQueryFilters } from "../../../types";
import {TAreaList, TPayloadArea} from "../interface/Area"; // Adjust the import path as necessary


interface IAreaController<T, F extends TQueryFilters> {
    /**
     * List Areas with filters.
     * @param filters - Filtering options for the Areas.
     * @returns Promise resolving to a list of Areas.
     */
    list(filters: F): Promise<TAreaList>;

    /**
     * Get a specific Area by ID.
     * @param id - The ID of the Area.
     * @returns Promise resolving to the Area object.
     */
    get(id: number): Promise<T | null>;

    /**
     * Create a new Area.
     * @param payload - The data to create the Area.
     * @returns Promise resolving to the created Area.
     */
    create(payload: TPayloadArea, user_id: number): Promise<T>;

    /**
     * Update an existing Area.
     * @param id - The ID of the Area to update.
     * @param payload - The data to update the Area.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TPayloadArea, userId: number): Promise<[affectedCount: number]>;

    /**
     * Delete Areas by IDs.
     * @param ids - Array of Area IDs to delete.
     * @param deletedBy - The ID of the user who deleted the Areas.
     * @returns Promise resolving to the count of deleted Areas.
     */
    delete(ids: number[], deletedBy: number): Promise<number>;
}

export default IAreaController;
