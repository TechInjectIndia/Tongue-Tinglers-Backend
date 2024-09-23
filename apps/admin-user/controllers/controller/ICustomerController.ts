import { NextFunction, Response } from "express";
import { TQueryFilters, TAddUser, TEditUser, TEditUserProfile, TUsersList, TUserWithPermission, TUpdateUserReferralCode } from '../../../../types';

/**
 * Interface for Customer Controller.
 */
interface ICustomerController<T, F extends TQueryFilters> {
    /**
     * List users with filters.
     * @param filters - Filtering options for users.
     * @returns Promise resolving to a list of users.
     */
    list(filters: F): Promise<TUsersList>;

    /**
     * Get a specific user by ID.
     * @param id - The ID of the user.
     * @returns Promise resolving to the user object with permissions.
     */
    get(id: string): Promise<TUserWithPermission>;

    /**
     * Create a new user.
     * @param payload - The data to create the user.
     * @returns Promise resolving to the created user.
     */
    create(payload: TAddUser): Promise<T>;

    /**
     * Update an existing user by ID.
     * @param id - The ID of the user to update.
     * @param payload - The data to update the user.
     * @returns Promise resolving to the affected count.
     */
    update(id: string, payload: TEditUser): Promise<[affectedCount: number]>; 

    /**
     * Delete users by IDs.
     * @param ids - Array of user IDs to delete.
     * @param deletedBy - The ID of the user who deleted the records.
     * @returns Promise resolving to the count of deleted users.
     */
    delete(ids: string[], deletedBy: number): Promise<number>;

    /**
     * Get a list of deleted users.
     * @param filters - Filtering options for deleted users.
     * @returns Promise resolving to a list of deleted users.
     */
    deletedList(filters: F): Promise<TUsersList>;

    /**
     * Restore deleted users by IDs.
     * @param ids - Array of user IDs to restore.
     * @returns Promise resolving when the operation is complete.
     */
    restore(ids: string[]): Promise<void>;

    /**
     * Permanently delete users by IDs.
     * @param ids - Array of user IDs to permanently delete.
     * @returns Promise resolving to the count of permanently deleted users.
     */
    deletePermanant(ids: string[]): Promise<number>;

    /**
     * Update user profile.
     * @param id - The ID of the user to update.
     * @param payload - The data to update the user profile.
     * @returns Promise resolving to the affected count.
     */
    updateProfile(id: string, payload: TEditUserProfile): Promise<[affectedCount: number]>;
}

export default ICustomerController;
