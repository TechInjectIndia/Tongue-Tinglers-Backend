import { Response } from "express";
import { TQueryFilters, TAddProductCategory, TEditProductCategory, TProductCategorysList } from '../../../../../types'

interface IProductsCategorysController<T, F extends TQueryFilters> {
    getProductCategoryByName(name: string): Promise<T>;
    get(id: number): Promise<T>;
    list(filters: F): Promise<TProductCategorysList>;
    create(payload: TAddProductCategory): Promise<T>;
    update(id: number, payload: TEditProductCategory): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
}

export default IProductsCategorysController;