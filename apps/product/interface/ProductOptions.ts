import { BaseMeta } from "apps/common/models/Base"
import { ParsedOptionsValue, parseOptionsValues } from "apps/order/interface/OptionsValues"

//todo rename to understand its received from frontend
interface BaseProductOptions {
    optionValueId: number
    price: number
    stock: number
    status: PRODUCT_OPTIONS_STATUS
    images: string[],
}

interface ProductOptions extends BaseMeta, BaseProductOptions {
    product_id: number;
    id: number;
}

enum PRODUCT_OPTIONS_STATUS {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

interface Pagination<T> {
    products: T[];
    total: number;
    totalPages: number;
}

interface ProductOptionsList<T> {
    productOptions: T[];
}

interface ParsedProductOptions {
    id: number;
    // product_id: number;
    option_value: ParsedOptionsValue;
    price: number;
    stock: number;
    status: PRODUCT_OPTIONS_STATUS;
    images: string;
}

export const parsedProductOptions = (data: any):ParsedProductOptions => {
    return {
        id: data.id,
        option_value: parseOptionsValues(data.optionsValue),
        price: data.price,
        stock: data.stock,
        status: data.status,
        images: data.images,
    };
};

export {
    BaseProductOptions,
    ProductOptions,
    PRODUCT_OPTIONS_STATUS,
    Pagination,
    ProductOptionsList,
    ParsedProductOptions,
};
