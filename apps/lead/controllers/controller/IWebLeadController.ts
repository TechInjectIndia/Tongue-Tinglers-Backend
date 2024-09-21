import { NextFunction, Response } from "express";
import { TLeadPayload } from '../../../../types';

/**
 * Interface for Lead Controller.
 */
interface IController<T> {
    /**
     * Create a new lead.
     * @param payload - The data to create the lead.
     * @returns Promise resolving to the created lead.
     */
    create(payload: TLeadPayload): Promise<T>;

    /**
     * Get a lead by a specific attribute.
     * @param whereName - The attribute name to filter by.
     * @param whereVal - The value of the attribute.
     * @returns Promise resolving to the lead data.
     */
    getLeadByAttr(whereName: any, whereVal: any): Promise<T>;
}

export default IController;
