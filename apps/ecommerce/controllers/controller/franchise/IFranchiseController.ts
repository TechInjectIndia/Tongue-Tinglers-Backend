import { Response } from "express";
import { TQueryFilters, TAddFranchise, TEditFranchise } from '../../../../../types'

interface IFranchiseController<T, F extends TQueryFilters> {
    get(id: number): Promise<Response<T>>;
    list(filters: F): Promise<Response<T[]>>;
    create(payload: TAddFranchise): Promise<Response<T>>;
    update(id: number, payload: TEditFranchise): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<Response<T>>;
}

export default IFranchiseController;
