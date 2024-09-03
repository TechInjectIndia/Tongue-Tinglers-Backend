import { Response } from "express";
import { TQueryFilters, TAddProduct, TEditProduct } from '../../../../types'

interface IWebProductsController<T, F extends TQueryFilters> {
    getProductByTag(type: string, limit: number): Promise<Response<T[]>>;
    list(filters: F): Promise<Response<T[]>>;
    search(filters: F): Promise<Response<T[]>>;
    getProductByName(name: string): Promise<Response<T>>;
    getProductBySlug(slug: string): Promise<Response<T>>;
}

export default IWebProductsController;
