import { Response } from "express";
import { TQueryFilters, TAddProduct, TProductsList } from '../../../../../types'

interface IWebProductsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<TProductsList>;
    search(filters: F): Promise<TProductsList>;
    getProductByTag(type: string, limit: number): Promise<TProductsList>;
    getProductByName(name: string): Promise<T>;
    getProductBySlug(slug: string): Promise<T>;
}

export default IWebProductsController;
