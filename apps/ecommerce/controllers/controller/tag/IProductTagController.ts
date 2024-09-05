import { Response } from "express";
import { TQueryFilters, TAddProductTag, TEditProductTag, TProductTagsList } from '../../../../../types'

interface IProductTagController<T, F extends TQueryFilters> {
    getTagByName(name: string): Promise<T>;
    get(id: number): Promise<T>;
    list(filters: F): Promise<TProductTagsList>;
    create(payload: TAddProductTag): Promise<T>;
    update(id: number, payload: TEditProductTag): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
}

export default IProductTagController;
