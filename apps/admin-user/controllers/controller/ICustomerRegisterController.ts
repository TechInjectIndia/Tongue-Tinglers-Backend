import { NextFunction, Response } from "express";
import { TQueryFilters, TAddUser, TUserWithPermission } from '../../../../types';

/**
 * Interface for Customer Registration Controller.
 */
interface ICustomerRegisterController<T, F extends TQueryFilters> {
    /**
     * Get a user by email.
     * @param email - The email of the user.
     * @returns Promise resolving to the user object or null if not found.
     */
    get(email: string): Promise<T | null>;

    /**
     * Create a new user.
     * @param payload - The data to create the user.
     * @returns Promise resolving to the created user.
     */
    create(payload: TAddUser): Promise<T>;
}

export default ICustomerRegisterController;
