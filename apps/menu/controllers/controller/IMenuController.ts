import { TQueryFilters, TMenu, TEditMenu, TMenusList, TAddMenu, } from '../../../../types'

interface IProfileController<T, F extends TQueryFilters> {
    create(payload: TAddMenu): Promise<T>;
    list(filters: F): Promise<TMenusList>;
    update(id: number, payload: TEditMenu): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
    getMenuByAttr(whereName: string, whereVal: any, getAttributes: any): Promise<T>;
}

export default IProfileController;
