import { NextFunction, Response } from "express";
import { TQueryFilters, TEditUserProfile } from '../../../../types';

/**
 * Interface for Profile Controller.
 */
interface IProfileController<T> {
    /**
     * Get a profile by ID.
     * @param id - The ID of the profile.
     * @returns Promise resolving to the profile object.
     */
    get(id: number): Promise<T>;

    /**
     * Update an existing profile.
     * @param id - The ID of the profile to update.
     * @param payload - The data to update the profile.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TEditUserProfile): Promise<[affectedCount: number]>;
}

export default IProfileController;
