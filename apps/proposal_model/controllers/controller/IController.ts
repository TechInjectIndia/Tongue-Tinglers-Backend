import { NextFunction, Response } from "express";
import { TPayloadProposalModel, ProposalModels, ProposalModelsList } from '../../../../interfaces';
import { TQueryFilters } from '../../../../types';

/**
 * Interface for ProposalModels Controller.
 */
interface IProposalModelsController<T, F extends TQueryFilters> {
    /**
     * List ProposalModelses for a user with filters.
     * @param user_id - The ID of the user.
     * @param filters - Filtering options for the ProposalModelses.
     * @returns Promise resolving to a list of ProposalModelses.
     */
    list(filters: F): Promise<ProposalModelsList>;

    /**
     * Get a specific ProposalModels by ID for a user.
     * @param id - The ID of the ProposalModels.
     * @param user_id - The ID of the user.
     * @returns Promise resolving to the ProposalModels object.
     */
    get(id: string): Promise<T | null>;

    /**
     * Create a new ProposalModels.
     * @param payload - The data to create the ProposalModels.
     * @returns Promise resolving to the created ProposalModels.
     */
    create(payload: TPayloadProposalModel): Promise<T>;

    /**
     * Update an existing ProposalModels for a user.
     * @param user_id - The ID of the user.
     * @param id - The ID of the ProposalModels to update.
     * @param payload - The data to update the ProposalModels.
     * @returns Promise resolving to the affected count.
     */
    update(id: string, payload: TPayloadProposalModel): Promise<[affectedCount: number]>;

    /**
     * Delete ProposalModelses by IDs for a user.
     * @param user_id - The ID of the user.
     * @param ids - Array of ProposalModels IDs to delete.
     * @param deletedBy - The ID of the user who deleted the ProposalModelses.
     * @returns Promise resolving to the count of deleted ProposalModelses.
     */
    delete(ids: number[], deletedBy: number): Promise<number>;
}

export default IProposalModelsController;