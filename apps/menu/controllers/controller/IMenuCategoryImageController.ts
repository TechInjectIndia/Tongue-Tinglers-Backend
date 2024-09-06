import { TQueryFilters, TMenu, TEditMenu, TMenusList, TAddMenu, } from '../../../../types'

interface IMenuCategoryImageController<T, F extends TQueryFilters> {
    get(id: number): Promise<T | null>;
    create(payload: TAddMenu): Promise<T>;
    update(id: number, payload: TEditMenu): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
}

export default IMenuCategoryImageController;
