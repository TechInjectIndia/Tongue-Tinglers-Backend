import { NextFunction, Response } from "express";
import { TQueryFilters, TAddFranchise, TEditFranchise, TEditFranchiseProfile } from '../../../../types'

interface IFranchiseController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    get(id: number): Promise<T>;
    create(payload: TAddFranchise): Promise<T>;
    update(id: number, payload: TEditFranchise): Promise<[affectedCount: number]>;
    delete(ids: number[], deletedBy: number): Promise<number>;
    getFranchiseByEmail(email: string): Promise<T>;
    deletedList(filters: F): Promise<Response<T[]>>;
}

export default IFranchiseController;
