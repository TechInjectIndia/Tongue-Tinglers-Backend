import { TQueryFilters, TMenuCategoryRelation, } from '../../../../types'

interface IMenuCategoryMapController<T, F extends TQueryFilters> {
    get(menuId: number, categoryId: number): Promise<T | null>;
    create(payload: TMenuCategoryRelation): Promise<T>;
    delete(ids: number[]): Promise<number>;
}

export default IMenuCategoryMapController;
