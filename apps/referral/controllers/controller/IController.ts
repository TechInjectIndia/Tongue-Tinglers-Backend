import { NextFunction, Response } from "express";
import { TQueryFilters, TAddress, TAddresssList } from '../../../../types'

interface IController<T, F extends TQueryFilters> {
    list(user_id: number, filters: F): Promise<TAddresssList>;
    get(id: number, user_id: number): Promise<T>;
    delete(user_id: number, ids: number[], deletedBy: number): Promise<number>;
}

export default IController;
