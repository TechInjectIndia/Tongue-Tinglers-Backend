import { ICheckList, TICheckListList, TICheckListPayload, TListFiltersICheckListt } from '../../interface/IChecklist';
import { TListFilters } from '../../../../types';

/**
 * Interface for PDI Checklist Controller.
 */

interface IChecklistController<T, F extends TListFilters> {
    /**
     * Find a PDI Checklist by primary key.
     * @param id - The ID of the PDI Checklist.
     * @returns Promise resolving to the PDI Checklist data or null if not found.
     */
    findByPk(id: number): Promise<ICheckList | null>;

    /**
     * Get PDI Checklist by ID.
     * @param id - The ID of the PDI Checklist.
     * @returns Promise resolving to the PDI Checklist data or null if not found.
     */
    get(id: number): Promise<ICheckList | null>;

    /**
     * List PDI Checklists with filters.
     * @param filters - The filtering options.
     * @returns Promise resolving to a list of PDI Checklists.
     */
    list(filters: TListFilters): Promise<TICheckListList>;

    /**
     * Create a new PDI Checklist.
     * @param payload - The data to create the PDI Checklist.
     * @returns Promise resolving to the created PDI Checklist.
     */
    create(payload: TICheckListPayload): Promise<TICheckListPayload>;

    /**
     * Update an existing PDI Checklist.
     * @param id - The ID of the PDI Checklist to update.
     * @param payload - The data to update the PDI Checklist.
     * @returns Promise resolving to the affected count and the updated checklist data.
     */
    update(id: number, payload: TICheckListPayload): Promise<[affectedCount: number, updatedChecklist: ICheckList[]]>;

    /**
     * Delete PDI Checklists by IDs.
     * @param ids - Array of PDI Checklist IDs to delete.
     * @returns Promise resolving to the count of deleted PDI Checklists.
     */
    delete(ids: number[]): Promise<number>; // Assuming IDs are strings
}

export default IChecklistController;
