import { Response } from "express";
import { TQueryFilters, TAddLead, TEditLead } from '../../../../types'

interface ILeadController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    getLeadByAttr(whereName: any, whereVal: any, getAttributes: any): Promise<Response<T>>;
    create(payload: TAddLead): Promise<Response<T>>;
    update(id: number, payload: TEditLead): Promise<Response<T>>;
    delete(ids: number[]): Promise<Response<T>>;
    getLeadStatus(whereName: any, whereVal: any, getAttributes: any): Promise<Response<T>>;
}

export default ILeadController;
