import { Pagination } from "apps/common/models/common"
import { BaseProductsCategory, PRODUCT_CATEGORY_STATUS, ProductsCategory } from "../interface/Category"

export interface IProductsCategoryRepo {

    createProductsCategory(category: BaseProductsCategory): Promise<ProductsCategory | null>

    getProductsCategoryById(id: number): Promise<ProductsCategory>

    getProductsCategoryBySlug(slug: string): Promise<ProductsCategory>

    // getAllProductsCategory(page: number, limit: number, search: string): Promise<Pagination<ProductsCategory>>

    updateProductsCategory(category: ProductsCategory): Promise<ProductsCategory>

    deleteProductsCategory(id: number): Promise<ProductsCategory>

    changeStatus(payload: PRODUCT_CATEGORY_STATUS): Promise<ProductsCategory>

}