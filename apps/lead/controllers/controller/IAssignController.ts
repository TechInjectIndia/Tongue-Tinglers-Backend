import { Response } from "express";
import { TAssignLead, TQueryFilters } from '../../../../types';
import { AssignAttributes } from '../../../../interfaces';

/**
 * Interface for Assign Controller.
 */
interface IAssignController<T, F extends TQueryFilters> {
    /**
     * Create a new assignment.
     * @param payload - The data to create the assignment.
     * @returns Promise resolving to the created assignment.
     */
    create(payload: TAssignLead): Promise<AssignAttributes>;

    /**
     * Get assignment by ID.
     * @param id - The ID of the assignment.
     * @returns Promise resolving to the assignment data.
     */
    get(id: string): Promise<AssignAttributes | null>;

    /**
     * Get assignments by lead ID.
     * @param leadId - The ID of the lead.
     * @returns Promise resolving to a list of assignments.
     */
    getByLeadId(leadId: string): Promise<AssignAttributes[]>;

    /**
     * Update an existing assignment.
     * @param id - The ID of the assignment to update.
     * @param payload - The data to update the assignment.
     * @returns Promise resolving to the affected count.
     */
    update(id: string, payload: Partial<TAssignLead>): Promise<[affectedCount: number]>; // Using Partial to allow partial updates

    /**
     * Delete assignments by IDs.
     * @param ids - Array of assignment IDs to delete.
     * @returns Promise resolving to the count of deleted assignments.
     */
    delete(ids: string[]): Promise<number>; // Assuming IDs are strings

    /**
     * Check if an assignment exists for a specific lead and user.
     * @param leadId - The ID of the lead.
     * @param userId - The ID of the user.
     * @returns Promise resolving to the assignment data if it exists, or null.
     */
    checkAssignmentExist(leadId: string, userId: string): Promise<AssignAttributes | null>;
}

export default IAssignController;
