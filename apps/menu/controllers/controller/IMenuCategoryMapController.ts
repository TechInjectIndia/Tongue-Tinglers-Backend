import { TQueryFilters, TMenuCategoryRelation, } from '../../../../types'

interface IMenuCategoryMapController<T, F extends TQueryFilters> {
    get(menuId: number, categoryId: number): Promise<T | null>;
    assign(payload: TMenuCategoryRelation): Promise<T>;
    unassign(menuId: number, categoryId: number): Promise<number>;
}

export default IMenuCategoryMapController;
