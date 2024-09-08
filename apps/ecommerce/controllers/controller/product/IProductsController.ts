import { Response } from "express";
import { TQueryFilters, TAddProduct, TEditProduct, TProductsList } from '../../../../../types'

interface IProductsController<T, F extends TQueryFilters> {
    get(id: number): Promise<T>;
    list(filters: F): Promise<TProductsList>;
    create(payload: TAddProduct): Promise<T>;
    update(id: number, payload: TEditProduct): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
}

export default IProductsController;
