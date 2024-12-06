import { BaseMeta } from "../database/schema/base/Base"

interface BaseProduct {
    name: string,
    slug: string,
    description: string,
    MOQ: number,
    category: number,
    type: PRODUCTS_TYPE,
    status: PRODUCT_STATUS,
    images: Array<string>,
    variationIds: Array<number>
    createdBy: number,
    updatedBy: number,
    deletedBy: number
}

enum PRODUCT_STATUS {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

enum PRODUCTS_TYPE {
    RETORT = 'retort',
    PACKAGING = 'packaging'
}

interface Product extends BaseMeta, BaseProduct {
    id: number
}

// interface TListFilters {
//     offset: number;
//     limit: number;
//     search?: string;
//     sorting?: any;
//     trashOnly?: string;
//     filters?: {
//         id?: number;
//         title?: string;
//         createdBy?: number;
//         [key: string]: any;
//     };
// };

interface Pagination<T> {
    products: T[];
    total: number;
    totalPages: number;
}

interface CHANGE_STATUS {
    status: PRODUCT_STATUS,
    id: number
}

export {
    Product,
    PRODUCTS_TYPE,
    BaseProduct,
    Pagination,
    PRODUCT_STATUS,
    CHANGE_STATUS
}
