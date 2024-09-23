import { Response } from "express";
import { TQueryFilters } from '../../../../types';

/**
 * Interface for Follow-Ups Controller.
 */
interface IFollowUpsController<T, F extends TQueryFilters> {
    /**
     * Get follow-ups scheduled for today.
     * @param assignedTo - The ID of the user assigned to the follow-ups.
     * @param getAttributes - The attributes to retrieve.
     * @returns Promise resolving to the follow-up data.
     */
    getTodayFollowUps(assignedTo: string, getAttributes: string[]): Promise<T[]>;

    /**
     * Get leads that have follow-ups scheduled for today.
     * @param getAttributes - The attributes to retrieve.
     * @returns Promise resolving to the leads data.
     */
    getLeadsByTodayFollowUps(getAttributes: string[]): Promise<T[]>;
}

export default IFollowUpsController;