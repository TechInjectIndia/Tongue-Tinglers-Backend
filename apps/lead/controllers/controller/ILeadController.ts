import { Response } from "express";
import { TQueryFilters, TAddLead, TEditLead } from '../../../../types'

interface ILeadController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    getLeadByAttr(whereName: string, whereVal: any, getAttributes: string): Promise<Response<T>>;
    create(payload: TAddLead): Promise<Response<T>>;
    update(id: number, payload: TEditLead): Promise<Response<T>>;
    delete(ids: number[]): Promise<Response<T>>;
    getLeadStatus(whereName: string, whereVal: any, getAttributes: string): Promise<Response<T>>;
}

export default ILeadController;
