import { NextFunction, Response } from "express";
import { TQueryFilters, TAddUser, TEditUser, TEditUserProfile, TUsersList, TUserWithPermission, TUpdateUserReferralCode } from '../../../types';

/**
 * Interface for User Controller.
 */
interface IUserController<T, F extends TQueryFilters> {
    checkIfUserExist(id: number): Promise<any>

    /**
     * List users with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to a list of users.
     */
    list(filters: F): Promise<TUsersList>;

    /**
     * Get a user by ID.
     * @param id - The ID of the user.
     * @returns Promise resolving to the user with permissions.
     */
    get(id: number): Promise<TUserWithPermission>;

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
    update(id: number, payload: TEditUser): Promise<[affectedCount: number]>;

    /**
     * Delete users by IDs.
     * @param ids - Array of user IDs to delete.
     * @param deletedBy - ID of the user who deleted the users.
     * @returns Promise resolving to the count of deleted users.
     */
    delete(ids: number[], deletedBy: number): Promise<number>;

    /**
     * Retrieve a list of deleted users.
     * @param filters - Filtering options.
     * @returns Promise resolving to a list of deleted users.
     */
    deletedList(filters: F): Promise<TUsersList>;

    /**
     * Restore deleted users by IDs.
     * @param ids - Array of user IDs to restore.
     * @returns Promise resolving to void.
     */
    restore(ids: number[]): Promise<void>;

    /**
     * Permanently delete users by IDs.
     * @param ids - Array of user IDs to delete permanently.
     * @returns Promise resolving to the count of permanently deleted users.
     */
    deletePermanant(ids: number[]): Promise<number>;

    /**
     * Update user profile by ID.
     * @param id - The ID of the user to update.
     * @param payload - The data to update the user profile.
     * @returns Promise resolving to the affected count.
     */
    updateProfile(id: number, payload: TEditUserProfile): Promise<[affectedCount: number]>;

    /**
     * Get a user by referral code.
     * @param referralCode - The referral code to search for.
     * @returns Promise resolving to the user or null if not found.
     */
    getByReferralCode(referralCode: string): Promise<T | null>;

    /**
     * Get all franchises associated with a referral code.
     * @param referralCode - The referral code to search franchises for.
     * @returns Promise resolving to an array of franchises.
     */
    getAllFranchiseByCode(referralCode: string): Promise<T[]>;

    /**
     * Check if a user exists by referral code.
     * @param referralCode - The referral code to check.
     * @returns Promise resolving to true or false.
     */
    existsByReferralCode(referralCode: string): Promise<boolean>;

    /**
     * Save referral data for a user.
     * @param id - The ID of the user.
     * @param data - The referral data to save.
     * @returns Promise resolving to the affected count.
     */
    saveReferral(id: number, data: TUpdateUserReferralCode): Promise<[affectedCount: number]>;
}

export default IUserController;
