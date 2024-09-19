import { Response } from "express";
import { TQueryFilters, TLeadPayload, TLeadStatus, TLeadsList } from '../../../../types'

interface ILeadController<T, F extends TQueryFilters> {
    getLeadByStatus(id: string): Promise<T>
    get(id: string): Promise<T>
    updateStatus(id: string, data: TLeadStatus): Promise<[affectedCount: number]>
    list(filters: F): Promise<TLeadsList>;
    getLeadByAttr(whereName: string, whereVal: any, getAttributes: string): Promise<T>;
    create(payload: TLeadPayload): Promise<T>;
    update(id: string, payload: TLeadPayload): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
    getLeadStatus(whereName: string, whereVal: any, getAttributes: string): Promise<TLeadStatus>;
}

export default ILeadController;
