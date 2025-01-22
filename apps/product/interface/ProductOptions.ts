import { BaseMeta } from "apps/common/models/Base"
import {
    ParsedOptionsValue,
    parseOptionsValues
} from "apps/optionsValue/interface/optionValue";
import { OptionsValueRepo } from "apps/optionsValue/repos/optionsValueRepo";
import { ParsedProduct } from "./Product";
import { parseProduct } from "../parser/productParser";


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

interface ParsedVariations {
    id: number;
    product: ParsedProduct;
    optionValue: ParsedOptionsValue;
    price: number;
    stock: number;
    status: PRODUCT_OPTIONS_STATUS;
    images: string;
}


// export const parsedProductOptions = async (data: any): Promise<ParsedProductOptions> => {
//     console.log('data: ', data);

//     // Ensure `data` is resolved before proceeding (assuming this is a promise)
//     const resolvedData = await data; // Ensure that data is resolved

//     return {
//         id: resolvedData.id,
//         option_value: parseOptionsValues(resolvedData.optionsValue),
//         price: resolvedData.price,
//         stock: resolvedData.stock,
//         status: resolvedData.status,
//         images: resolvedData.images,
//     };
// };

// export const parsedProductOptions =  (data: any): ParsedProductOptions=> {

//     console.log('4e6r5t7y8uoi')
//     console.log(data)
//     console.log('4657890')

//     return {
//         id: data.id,
//         product: parseProduct(data.product_id),
//         optionValue: parseOptionsValues(data.optionsValue),
//         price: data.price,
//         stock: data.stock,
//         status: data.status,
//         images: data.images,
//     };
// };

export {
    BaseProductOptions,
    ProductOptions,
    PRODUCT_OPTIONS_STATUS,
    Pagination,
    ProductOptionsList,
    ParsedVariations,
};
