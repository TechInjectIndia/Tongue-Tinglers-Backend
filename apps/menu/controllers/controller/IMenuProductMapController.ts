import { TQueryFilters, } from '../../../../types'

interface IMenuProductMapController<T, F extends TQueryFilters> {
    assign(categoryId: number, productId: number): Promise<[affectedCount: number]>;
    unassign(productId: number): Promise<[affectedCount: number]>;
}

export default IMenuProductMapController;
