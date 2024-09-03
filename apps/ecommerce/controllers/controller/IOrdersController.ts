import { Response } from "express";
import { TQueryFilters, TAddOrder, TEditOrder } from '../../../../types'

interface IOrdersController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    update(id: number, payload: TEditOrder): Promise<[affectedCount: number]>;
}

export default IOrdersController;
