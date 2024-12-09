import { BaseMeta } from "../database/schema/base/Base"

interface BaseProductsCategory {
    name: string;
    description: string;
    status: PRODUCT_CATEGORY_STATUS;
    slug: string;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}

enum PRODUCT_CATEGORY_STATUS {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

interface ProductsCategory extends BaseMeta, BaseProductsCategory {
    id: number
}

interface Pagination<T> {
    products_category: T[];
    total: number;
    totalPages: number;
}

export {
    BaseProductsCategory,
    ProductsCategory,
    PRODUCT_CATEGORY_STATUS,
    Pagination
}