import { NextFunction, Response } from "express";
import { TQueryFilters, TAddAddress, TEditAddress, TAddress, TAddresssList } from '../../../../types'

interface IController<T, F extends TQueryFilters> {
    list(user_id: number, filters: F): Promise<TAddresssList>;
    get(id: number): Promise<T>;
    create(payload: TAddAddress): Promise<T>;
    update(user_id: number, id: number, payload: TEditAddress): Promise<[affectedCount: number]>;
    delete(user_id: number, ids: number[], deletedBy: number): Promise<number>;
}

export default IController;
