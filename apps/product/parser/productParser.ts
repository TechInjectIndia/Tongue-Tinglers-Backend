import { parsedProductOptions } from "../../../interfaces/product-options";
import { ParsedProduct } from "../../../interfaces/products";
import {parseCategory} from "../../products-category/parser/parseProductCategory"
const parseProduct = (product: any): ParsedProduct => {
    const variations = product.variations.map((productOption: any) => {
        return parsedProductOptions(productOption);
    });
    const data: ParsedProduct = {
        id: product.id,
        name: product.name,
        MOQ: product.MOQ,
        category: parseCategory(product.productCategory),
        description: product.description,
        images: product.images,
        slug: product.slug,
        status: product.status,
        type: product.type,
        tax_rate_id: product.tax_rate_id,
        vendorId: product.vendorId,
        updatedBy: product.updatedByUser,
        deletedBy: product.deletedByUser,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt,
        variations: variations ,
        createdBy:product.createdByUser
    
    };
    
    return data;
}

export { parseProduct };
