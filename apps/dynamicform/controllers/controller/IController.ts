import { NextFunction, Response } from "express";
import { TQueryFilters, TPayloadDynamicForm, TDynamicForm, TDynamicFormsList } from '../../../../types';
import { IFormQuestion } from '../../../../interfaces';

/**
 * Interface for DynamicForm Controller.
 */
interface IDynamicFormController<T, F extends TQueryFilters> {
    /**
     * List dynamic form questions for a user with filters.
     * @param user_id - The ID of the user.
     * @param filters - Filtering options for the dynamic form questions.
     * @returns Promise resolving to a list of dynamic form questions.
     */
    list(user_id: number, filters: F): Promise<TDynamicFormsList>;

    /**
     * Get a specific dynamic form question by ID for a user.
     * @param id - The ID of the dynamic form question.
     * @param user_id - The ID of the user.
     * @returns Promise resolving to the dynamic form question object.
     */
    get(id: number, user_id: number): Promise<T>;

    /**
     * Create a new dynamic form question.
     * @param payload - The data to create the dynamic form question.
     * @returns Promise resolving to the created dynamic form question.
     */
    create(payload: TPayloadDynamicForm): Promise<T>;

    /**
     * Update an existing dynamic form question for a user.
     * @param user_id - The ID of the user.
     * @param id - The ID of the dynamic form question to update.
     * @param payload - The data to update the dynamic form question.
     * @returns Promise resolving to the affected count.
     */
    update(user_id: number, id: number, payload: TPayloadDynamicForm): Promise<[affectedCount: number]>; 

    /**
     * Delete dynamic form questions by IDs for a user.
     * @param user_id - The ID of the user.
     * @param ids - Array of dynamic form question IDs to delete.
     * @param deletedBy - The ID of the user who deleted the dynamic form questions.
     * @returns Promise resolving to the count of deleted dynamic form questions.
     */
    delete(user_id: number, ids: number[], deletedBy: number): Promise<number>;
}

export default IDynamicFormController;
