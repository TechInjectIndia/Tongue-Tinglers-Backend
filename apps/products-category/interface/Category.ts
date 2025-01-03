import { BaseMeta, BaseMetaUsers } from "apps/common/models/Base";
import { PRODUCT_STATUS } from "apps/product/interface/Product";

export enum P_CATEGORY_TYPE {
    ACTIVE = 1,
    NOT_ACTIVE = 0
}

export interface IProductCategory {
    id: number; // Adjust based on your actual type
    name: string;
    description: string; // Ensure you have this field
    active: boolean; // Ensure you have this field
    slug: string; // Ensure you have this field
    createdAt: Date; // Ensure you have this field
    updatedAt: Date; // Ensure you have this field
}



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


interface ParsedCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    type: CATEGORY_TYPE;
    status: PRODUCT_STATUS;
}

export {
    BaseProductsCategory,
    ProductsCategory,
    PRODUCT_CATEGORY_STATUS,
    ParsedCategory,
    CATEGORY_TYPE
};
