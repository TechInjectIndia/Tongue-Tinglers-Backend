import { Response } from "express";
import { TQueryFilters, TAddProduct, TEditProduct } from '../../../../../types'

interface IProductsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    create(payload: TAddProduct): Promise<Response<T>>;
    update(id: number, payload: TEditProduct): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<Response<T>>;
}

export default IProductsController;
