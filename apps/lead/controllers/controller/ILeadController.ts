import { Response } from "express";
import { TQueryFilters, TAddLead, TEditLead, TLeadStatus, TLeadsList } from '../../../../types'

interface ILeadController<T, F extends TQueryFilters> {
    list(filters: F): Promise<TLeadsList>;
    getLeadByAttr(whereName: string, whereVal: any, getAttributes: string): Promise<T>;
    create(payload: TAddLead): Promise<T>;
    update(id: number, payload: TEditLead): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
    getLeadStatus(whereName: string, whereVal: any, getAttributes: string): Promise<TLeadStatus>;
}

export default ILeadController;
