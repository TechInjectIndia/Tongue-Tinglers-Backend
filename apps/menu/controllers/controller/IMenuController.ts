import { TQueryFilters, TMenu, TEditMenu, TMenusList, TAddMenu, } from '../../../../types'

interface IMenuController<T, F extends TQueryFilters> {
    create(payload: TAddMenu): Promise<T>;
    list(filters: F): Promise<TMenusList>;
    update(id: number, payload: TEditMenu): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
    get(id: number): Promise<T>;
    getMenuByName(name: string): Promise<T>;
}

export default IMenuController;
