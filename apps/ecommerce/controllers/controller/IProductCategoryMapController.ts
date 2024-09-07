import { TQueryFilters, TProductCategoryLink, } from '../../../../types'

interface IProductCategoryMapController<T, F extends TQueryFilters> {
    assign(payload: TProductCategoryLink): Promise<T>;
    get(productId: number, categoryId: number): Promise<T>;
    unassign(ProductId: number, categoryId: number): Promise<number>;
}

export default IProductCategoryMapController;
