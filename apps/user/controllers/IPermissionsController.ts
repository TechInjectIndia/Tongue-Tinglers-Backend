import { NextFunction, Response } from "express";
import { TQueryFilters, TPermissionPayload, TPermissionsList, TUser } from '../../../types';

/**
 * Interface for Permissions Controller.
 */
interface IPermissionsController<T, F extends TQueryFilters> {
    /**
     * Get users assigned to a permission by IDs.
     * @param ids - Array of permission IDs.
     * @returns Promise resolving to an array of users.
     */
    getPermissionAssigneeByPermissionId(ids: number[]): Promise<TUser[]>;

    /**
     * Retrieve a permission by name.
     * @param name - The name of the permission.
     * @returns Promise resolving to the permission object or null if not found.
     */
    getPermissionByName(name: string): Promise<T | null>;

    /**
     * Check if a permission exists, excluding a specific ID.
     * @param name - The name of the permission.
     * @param excludeId - ID to exclude from the check.
     * @returns Promise resolving to the permission object or null if not found.
     */
    checkPermissionExist(name: string, excludeId: number): Promise<T | null>;

    /**
     * List permissions with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to a list of permissions.
     */
    list(filters: F): Promise<TPermissionsList>;

    /**
     * Get a permission by ID.
     * @param id - The ID of the permission.
     * @returns Promise resolving to the permission object or null if not found.
     */
    get(id: number): Promise<T | null>;

    /**
     * Create a new permission.
     * @param payload - The data to create the permission.
     * @returns Promise resolving to the created permission.
     */
    create(payload: TPermissionPayload): Promise<T>;

    /**
     * Update an existing permission by ID.
     * @param id - The ID of the permission to update.
     * @param payload - The data to update the permission.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TPermissionPayload): Promise<[affectedCount: number]>;
}

export default IPermissionsController;
