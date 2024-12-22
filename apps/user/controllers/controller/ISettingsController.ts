import { NextFunction, Response } from "express";
import { TQueryFilters, TSettings, TPayloadSettings } from '../../../../types';

/**
 * Interface for Settings Controller.
 */
interface ISettingsController<T, F extends TQueryFilters> {
    /**
     * List settings with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to an array of settings.
     */
    list(filters: F): Promise<Response<T[]>>;

    /**
     * Get a setting by ID.
     * @param id - The ID of the setting.
     * @returns Promise resolving to the setting object.
     */
    get(id: number): Promise<T>;

    /**
     * Create a new setting.
     * @param payload - The data to create the setting.
     * @returns Promise resolving to the created setting.
     */
    create(payload: TSettings): Promise<T>;

    /**
     * Update an existing setting by ID.
     * @param id - The ID of the setting to update.
     * @param payload - The data to update the setting.
     * @returns Promise resolving to the updated setting.
     */
    update(id: number, payload: TPayloadSettings): Promise<T>;

    /**
     * Delete settings by IDs.
     * @param ids - Array of setting IDs to delete.
     * @param deletedBy - ID of the user who deleted the settings.
     * @returns Promise resolving to the deleted setting.
     */
    delete(ids: number[], deletedBy: number): Promise<T>;
}

export default ISettingsController;
