import { TQueryFilters, TMenuProduct, TEditMenuProduct, TMenuProductsList, TAddMenuProduct, } from '../../../../types'

interface IMenuProductController<T, F extends TQueryFilters> {
    get(id: number): Promise<T | null>;
    create(payload: TAddMenuProduct): Promise<T>;
    list(filters: F): Promise<TMenuProductsList>;
    update(id: number, payload: TEditMenuProduct): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
    getMenuProductByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<T | null>;
}

export default IMenuProductController;
