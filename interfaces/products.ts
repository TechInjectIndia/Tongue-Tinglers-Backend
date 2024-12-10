import { BaseMeta } from "../database/schema/base/Base";
import { BaseProductOptions, ParsedProductOptions } from "./product-options";
import { ParsedCategory } from "./products_category";
import { ParsedUser } from "./user";

interface BaseProduct {
    name: string;
    slug: string;
    description: string;
    MOQ: number;
    category: number;
    type: PRODUCTS_TYPE;
    status: PRODUCT_STATUS;
    images: Array<string>;
    // variationIds: Array<number>,
    productOptionsIds: Array<number>;
    tax_rate_id: number;
    vendorId: number;
    variations?: Array<BaseProductOptions>;
}

interface Product extends BaseProduct {
    variationIds: Array<number>;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}

enum PRODUCT_STATUS {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

enum PRODUCTS_TYPE {
    RETORT = "retort",
    PACKAGING = "packaging",
}

interface Product extends BaseMeta, BaseProduct {
    id: number;
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
    data: T[];
    total: number;
    totalPages: number;
}

interface CHANGE_STATUS {
    status: PRODUCT_STATUS;
    id: number;
}

interface ParsedProduct {
    id: number;
    name: string;
    slug: string;
    description: string;
    MOQ: number;
    category: ParsedCategory;
    type: PRODUCTS_TYPE;
    status: PRODUCT_STATUS;
    images: Array<string>;
    createdBy: ParsedUser;
    updatedBy: ParsedUser;
    deletedBy: ParsedUser;
    tax_rate_id: number;
    variations?: Array<ParsedProductOptions>;
}


export {
    Product,
    PRODUCTS_TYPE,
    BaseProduct,
    Pagination,
    PRODUCT_STATUS,
    CHANGE_STATUS,
    ParsedProduct
};
