

import {ParsedProduct} from "../interface/Product";
// import {parsedProductOptions} from "../interface/ProductOptions";
import {
    parseCategory
} from "../../products-category/parser/parseProductCategory";
import { parsedVariations } from "apps/cart-products/interface/Cart";
import { parseUserToMetaUser } from "apps/user/parser/user-parser";
const parseProduct = (product: any): ParsedProduct => {
    let variations: any = null;
    if(product.variation){
        variations = product.variations.map((productOption: any) => {
            return parsedVariations(productOption);
        });
    }
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
        createdBy: parseUserToMetaUser(product.createdByUser),
        updatedBy: product.updatedByUser ? parseUserToMetaUser(product.updatedByUser) : null,
        deletedBy: product.deletedByUser ? parseUserToMetaUser(product.deletedByUser) : null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt,
        variations: variations

    };
    return data;
}

export { parseProduct };
