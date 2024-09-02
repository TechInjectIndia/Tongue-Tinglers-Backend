import { NextFunction, Response } from "express";
import { TQueryFilters, TAddAddress, TEditAddress } from '../../../../types'

interface IController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    get(id: number): Promise<Response<T>>;
    create(payload: TAddAddress): Promise<Response<T>>;
    update(id: number, payload: TEditAddress): Promise<Response<T>>;
    delete(ids: number[], deletedBy: number): Promise<Response<T>>;
}

export default IController;
