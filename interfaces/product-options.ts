import { BaseMeta } from "../database/schema/base/Base";

interface BaseProductOptions {
    id: any
    product_id: number
    option_value_id: number
    price: number
    stock: number
    status: PRODUCT_OPTIONS_STATUS
    images: string,
    createdBy: number,
    updatedBy: number,
    deletedBy: number
}

interface ProductOptions extends BaseMeta, BaseProductOptions {
    product_id: number;
    id: number;
}

enum PRODUCT_OPTIONS_STATUS {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

interface Pagination<T> {
    products: T[];
    total: number;
    totalPages: number;
}

interface ProductOptionsList<T> {
    productOptions: T[];
}

export {
    BaseProductOptions,
    ProductOptions,
    PRODUCT_OPTIONS_STATUS,
    Pagination,
    ProductOptionsList,
};
