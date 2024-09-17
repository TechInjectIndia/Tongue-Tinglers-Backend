import { TQueryFilters, TMenuCategory, TPayloadMenuCategory, TMenuCategorysList, TPayloadMenuCategory, } from '../../../../types'

interface IMenuCategoryController<T, F extends TQueryFilters> {
    get(id: number): Promise<T | null>;
    create(payload: TPayloadMenuCategory): Promise<T>;
    update(id: number, payload: TPayloadMenuCategory): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
    getMenuCategoryByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<T | null>;
}

export default IMenuCategoryController;
