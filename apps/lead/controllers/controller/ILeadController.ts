
import { TQueryFilters, TLeadPayload, TLeadStatus, TLeadsList } from '../../../../types';
import { ILead, ParseLead } from '../../../../interfaces';
import { LeadPayload, LeadTable } from "../../interface/lead"
/**
 * Interface for Lead Controller.
 */
interface ILeadController<T, F extends TQueryFilters> {
    /**
     * Get lead by status.
     * @param id - The ID of the lead.
     * @returns Promise resolving to the lead data.
     */
    getLeadByStatus(id: number): Promise<LeadTable | null>;

    /**
     * Get lead by ID.
     * @param id - The ID of the lead.
     * @returns Promise resolving to the lead data.
     */
    get(id: number): Promise<LeadTable | null>;

    /**
     * Update the status of a lead.
     * @param id - The ID of the lead to update.
     * @param data - The new status data.
     * @returns Promise resolving to the affected count.
     */
    updateStatus(id: number, data: TLeadStatus): Promise<[affectedCount: number]>;

    /**
     * List leads with filters.
     * @param filters - The filtering options.
     * @returns Promise resolving to a list of leads.
     */
    list(filters: TQueryFilters): Promise<ParseLead>;

    /**
     * Get lead by a specific attribute.
     * @param whereName - The attribute name to filter by.
     * @param whereVal - The value of the attribute.
     * @param getAttributes - The attributes to retrieve.
     * @returns Promise resolving to the lead data.
     */
    getLeadByAttr(whereName: keyof LeadTable, whereVal: any, getAttributes: Array<keyof LeadTable>): Promise<LeadTable | null>;

    /**
     * Create a new lead.
     * @param payload - The data to create the lead.
     * @returns Promise resolving to the created lead.
     */
    create(payload: LeadPayload): Promise<LeadTable>;

    /**
     * Update an existing lead.
     * @param id - The ID of the lead to update.
     * @param payload - The data to update the lead.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: LeadPayload): Promise<[affectedCount: number]>;

    /**
     * Delete leads by IDs.
     * @param ids - Array of lead IDs to delete.
     * @returns Promise resolving to the count of deleted leads.
     */
    delete(ids: number[]): Promise<number>; // Assuming IDs are strings

    /**
     * Get lead status by a specific attribute.
     * @param whereName - The attribute name to filter by.
     * @param whereVal - The value of the attribute.
     * @param getAttributes - The attributes to retrieve.
     * @returns Promise resolving to the lead status.
     */
    getLeadStatus(whereName: keyof LeadTable, whereVal: any, getAttributes: Array<keyof TLeadStatus>): Promise<TLeadStatus | null>;
}

export default ILeadController;
