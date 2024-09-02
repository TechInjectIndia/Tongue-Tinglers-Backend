import { NextFunction, Response } from "express";
import { TQueryFilters, TAddFranchise, TEditFranchise, TEditFranchiseProfile } from '../../../../types'

interface IFranchiseController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    get(id: number): Promise<Response<T>>;
    create(payload: TAddFranchise): Promise<Response<T>>;
    update(id: number, payload: TEditFranchise): Promise<Response<T>>;
    delete(ids: number[], deletedBy: number): Promise<Response<T>>;
    getFranchiseByEmail(email: string): Promise<Response<T>>;
    deletedList(filters: F): Promise<Response<T[]>>;
}

export default IFranchiseController;
