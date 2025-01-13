import { BaseMeta, BaseMetaUsers } from "apps/common/models/Base";
import { PRODUCT_STATUS } from "apps/product/interface/Product";

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
    SAMPLE_KIT= "sample-kit"
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
