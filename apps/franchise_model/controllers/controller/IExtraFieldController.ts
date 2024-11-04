import { NextFunction, Response } from "express";
import { TPayloadFranchiseModel, FranchiseModels, FranchiseModelsList } from '../../../../interfaces';
import { TQueryFilters } from '../../../../types';

/**
 * Interface for FranchiseModels Controller.
 */
interface IFranchiseModelsController<T, F extends TQueryFilters> {
    /**
     * Get a specific FranchiseModels by ID for a user.
     * @param id - The ID of the FranchiseModels.
     * @param user_id - The ID of the user.
     * @returns Promise resolving to the FranchiseModels object.
     */
    get(id: number, user_id: number): Promise<T | null>;

    /**
     * Create a new FranchiseModels.
     * @param payload - The data to create the FranchiseModels.
     * @returns Promise resolving to the created FranchiseModels.
     */
    create(payload: TPayloadFranchiseModel): Promise<T>;

    /**
     * Update an existing FranchiseModels for a user.
     * @param user_id - The ID of the user.
     * @param id - The ID of the FranchiseModels to update.
     * @param payload - The data to update the FranchiseModels.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TPayloadFranchiseModel): Promise<[affectedCount: number]>;

    /**
     * Delete FranchiseModelses by IDs for a user.
     * @param user_id - The ID of the user.
     * @param ids - Array of FranchiseModels IDs to delete.
     * @param deletedBy - The ID of the user who deleted the FranchiseModelses.
     * @returns Promise resolving to the count of deleted FranchiseModelses.
     */
    delete(ids: number[], deletedBy: number): Promise<number>;
}

export default IFranchiseModelsController;
