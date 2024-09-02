import { NextFunction, Response } from "express";
import { TQueryFilters, TAddAddress, TEditAddress } from '../../../../types'

interface IController<T, F extends TQueryFilters> {
    list(user_id: number, filters: F): Promise<Response<T[]>>;
    get(id: number): Promise<Response<T>>;
    create(payload: TAddAddress): Promise<Response<T>>;
    update(user_id: number, id: number, payload: TEditAddress): Promise<Response<T>>;
    delete(user_id: number, ids: number[], deletedBy: number): Promise<Response<T>>;
}

export default IController;
