import { NextFunction, Response } from "express";
import { TQueryFilters, TRolePayload, TRolesList, TUser } from '../../../types';

/**
 * Interface for Roles Controller.
 */
interface IRolesController<T, F extends TQueryFilters> {
    /**
     * Get users assigned to a role by IDs.
     * @param ids - Array of role IDs.
     * @returns Promise resolving to an array of users.
     */
    getRoleAssigneeByRoleId(ids: number[]): Promise<TUser[]>;

    /**
     * Retrieve a role by name.
     * @param name - The name of the role.
     * @returns Promise resolving to the role object or null if not found.
     */
    getRoleByName(name: string): Promise<T | null>;

    /**
     * List roles with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to a list of roles.
     */
    list(filters: F): Promise<TRolesList>;

    /**
     * Get a role by ID.
     * @param id - The ID of the role.
     * @returns Promise resolving to the role object or null if not found.
     */
    get(id: number): Promise<T | null>;

    /**
     * Create a new role.
     * @param payload - The data to create the role.
     * @returns Promise resolving to the created role.
     */
    create(payload: TRolePayload): Promise<T>;

    /**
     * Update an existing role by ID.
     * @param id - The ID of the role to update.
     * @param payload - The data to update the role.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TRolePayload): Promise<[affectedCount: number]>;

    /**
     * Delete roles by IDs.
     * @param ids - Array of role IDs to delete.
     * @returns Promise resolving to the count of deleted roles.
     */
    deleteRole(ids: number[]): Promise<number>;
}

export default IRolesController;
