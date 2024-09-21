import { Response } from "express";
import { TQueryFilters, TAddProduct, TProductsList } from '../../../../../types';

/**
 * Interface for Web Products Controller.
 */
interface IWebProductsController<T, F extends TQueryFilters> {
    /**
     * List products with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to a list of products.
     */
    list(filters: F): Promise<TProductsList>;

    /**
     * Search products based on provided filters.
     * @param filters - Filtering options for searching.
     * @returns Promise resolving to a list of products matching the search criteria.
     */
    search(filters: F): Promise<TProductsList>;

    /**
     * Get products by tag.
     * @param type - The tag type.
     * @param limit - The maximum number of products to retrieve.
     * @returns Promise resolving to a list of products associated with the tag.
     */
    getProductByTag(type: string, limit: number): Promise<TProductsList>;

    /**
     * Get a product by its name.
     * @param name - The name of the product.
     * @returns Promise resolving to the product object or null if not found.
     */
    getProductByName(name: string): Promise<T>;

    /**
     * Get a product by its slug.
     * @param slug - The slug of the product.
     * @returns Promise resolving to the product object or null if not found.
     */
    getProductBySlug(slug: string): Promise<T>;
}

export default IWebProductsController;
