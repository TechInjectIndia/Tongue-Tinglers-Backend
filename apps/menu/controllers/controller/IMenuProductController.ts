import { TQueryFilters, TMenuProductsList, TPayloadMenuProduct, } from '../../../../types'

interface IMenuProductController<T, F extends TQueryFilters> {
    get(id: number): Promise<T | null>;
    create(payload: TPayloadMenuProduct): Promise<T>;
    list(filters: F): Promise<TMenuProductsList>;
    update(id: number, payload: TPayloadMenuProduct): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
    getMenuProductByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<T | null>;
}

export default IMenuProductController;
