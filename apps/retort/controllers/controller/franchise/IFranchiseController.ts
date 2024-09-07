import { Response } from "express";
import { TQueryFilters, TAddFranchise, TEditFranchise } from '../../../../../types'

interface IFranchiseController<T, F extends TQueryFilters> {
    get(id: number): Promise<T>;
    list(filters: F): Promise<Response<T[]>>;
    create(payload: TAddFranchise): Promise<T>;
    update(id: number, payload: TEditFranchise): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<T>;
}

export default IFranchiseController;
