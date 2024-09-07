import { Response } from "express";
import { TQueryFilters, TAddRetortProductCategory, TEditRetortProductCategory, TRetortProductCategorysList } from '../../../../../types'

interface IRetortProductsCategorysController<T, F extends TQueryFilters> {
    getRetortProductCategoryByName(name: string): Promise<T>;
    get(id: number): Promise<T>;
    list(filters: F): Promise<TRetortProductCategorysList>;
    create(payload: TAddRetortProductCategory): Promise<T>;
    update(id: number, payload: TEditRetortProductCategory): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
}

export default IRetortProductsCategorysController;