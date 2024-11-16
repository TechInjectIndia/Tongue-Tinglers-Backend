import { NextFunction, Response } from "express";
import { TQueryFilters } from "../../../../types"; // Adjust the import path as necessary
import { TRegionList, TPayloadRegion } from "../../../../interfaces"; // Ensure these types are defined in your interfaces

interface IRegionController<T, F extends TQueryFilters> {
    /**
     * List regions with filters.
     * @param filters - Filtering options for the regions.
     * @returns Promise resolving to a list of regions.
     */
    list(filters: F): Promise<TRegionList>;

    /**
     * Get a specific region by ID.
     * @param id - The ID of the region.
     * @returns Promise resolving to the region object.
     */
    get(id: number): Promise<T | null>;

    /**
     * Create a new region.
     * @param payload - The data to create the region.
     * @returns Promise resolving to the created region.
     */
    create(payload: TPayloadRegion): Promise<T>;

    /**
     * Update an existing region.
     * @param id - The ID of the region to update.
     * @param payload - The data to update the region.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TPayloadRegion): Promise<[affectedCount: number]>; 

    /**
     * Delete regions by IDs.
     * @param ids - Array of region IDs to delete.
     * @param deletedBy - The ID of the user who deleted the regions.
     * @returns Promise resolving to the count of deleted regions.
     */
    delete(ids: number[], deletedBy: string): Promise<number>;
}

export default IRegionController;
