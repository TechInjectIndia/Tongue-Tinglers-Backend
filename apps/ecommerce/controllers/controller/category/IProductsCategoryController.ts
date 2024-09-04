import { Response } from "express";
import { TQueryFilters, TAddProductCategory, TEditProductCategory } from '../../../../../types'

interface IProductsCategorysController<T, F extends TQueryFilters> {
    getProductCategoryByName(name: string): Promise<Response<T>>;
    get(id: number): Promise<Response<T>>;
    list(filters: F): Promise<Response<T[]>>;
    create(payload: TAddProductCategory): Promise<Response<T>>;
    update(id: number, payload: TEditProductCategory): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<Response<T>>;
}

export default IProductsCategorysController;