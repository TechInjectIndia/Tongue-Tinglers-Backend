import { parseOptionsValues } from "apps/optionsValue/interface/optionValue";
import { ParsedVariations } from "apps/product/interface/ProductOptions";
import { parseProduct } from "apps/product/parser/productParser";

const parseProductVariation = (variation:any): ParsedVariations => {
    console.log('variation: ', variation.productData);
    const data: ParsedVariations = {
        id: variation.id,
        product: variation.productData ? parseProduct(variation.productData) : null,
        optionValue: variation.optionsValue ? parseOptionsValues(variation.optionsValue) : null,
        price: variation.price,
        stock: variation.stock,
        status: variation.status,
        images: variation.images,
    }
    return data
} 

export {parseProductVariation}