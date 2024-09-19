import { Response } from "express";
import { TQueryFilters, TOrdersList, TEditOrder, TAddOrder } from '../../../../types'

interface IOrdersController<T, F extends TQueryFilters> {
    get(id: number): Promise<T | null>;
    orderStatus(id: number): Promise<T | null>;
    create(payload: TAddOrder): Promise<T>;
    list(filters: F): Promise<TOrdersList>;
    update(id: number, payload: TEditOrder): Promise<[affectedCount: number]>;
}

export default IOrdersController;
