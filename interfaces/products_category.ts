import { BaseMeta, BaseMetaUsers } from "../database/schema/base/Base";
import { PRODUCT_STATUS } from "./products";
import { ParsedUser } from "./user";

interface BaseProductsCategory extends BaseMetaUsers {
    name: string;
    description: string;
    status: PRODUCT_CATEGORY_STATUS;
    slug: string;
    type: CATEGORY_TYPE;
}

enum CATEGORY_TYPE {
    RETORT = "retort",
    PACKAGING = "packaging",
}

enum PRODUCT_CATEGORY_STATUS {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

interface ProductsCategory extends BaseMeta, BaseProductsCategory {
    id: number;
}

interface Pagination<T> {
    products_category: T[];
    total: number;
    totalPages: number;
}

interface ParsedCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    status: PRODUCT_STATUS;
}

export {
    BaseProductsCategory,
    ProductsCategory,
    PRODUCT_CATEGORY_STATUS,
    Pagination,
    ParsedCategory,
    CATEGORY_TYPE
};
