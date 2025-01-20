import { BaseMeta, ParsedMeta } from "apps/common/models/Base";
import { BaseProductOptions, ParsedProductOptions } from "./ProductOptions";
import { ParsedCategory } from "apps/products-category/interface/Category";

// received from frontend
interface BaseProduct {
    name: string;
    slug: string;
    description: string;
    MOQ: number;
    category: number;
    type: PRODUCTS_TYPE;
    status: PRODUCT_STATUS;
    images: Array<string>;
    tax_rate_id: number;
    vendorId: number;
    variations: Array<BaseProductOptions> | null;
}

interface IProductTable extends Omit<BaseProduct, "variations">, BaseMeta {}

enum PRODUCT_STATUS {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

enum PRODUCTS_TYPE {
    RETORT = "retort",
    PACKAGING = "packaging",
    SAMPLE_KIT = "sample-kit",
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

interface ParsedProduct extends ParsedMeta {
    id: number;
    name: string;
    slug: string;
    description: string;
    MOQ: number;
    category: ParsedCategory;
    type: PRODUCTS_TYPE;
    status: PRODUCT_STATUS;
    images: Array<string>;
    tax_rate_id: number;
    vendorId: number;
    variations?: Array<ParsedProductOptions>;
    logs?: any[] | null
}

export interface TaxRate {
    id: number;
    title: string;
    value: number;
}

export {
    IProductTable,
    PRODUCTS_TYPE,
    BaseProduct,
    Pagination,
    PRODUCT_STATUS,
    CHANGE_STATUS,
    ParsedProduct,
    
};
