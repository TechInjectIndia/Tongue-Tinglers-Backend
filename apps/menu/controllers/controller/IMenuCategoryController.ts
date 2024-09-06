import { TQueryFilters, TMenuCategory, TEditMenuCategory, TMenuCategorysList, TAddMenuCategory, } from '../../../../types'

interface IMenuCategoryController<T, F extends TQueryFilters> {
    get(id: number): Promise<T | null>;
    create(payload: TAddMenuCategory): Promise<T>;
    update(id: number, payload: TEditMenuCategory): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
    getMenuCategoryByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<T | null>;
}

export default IMenuCategoryController;
