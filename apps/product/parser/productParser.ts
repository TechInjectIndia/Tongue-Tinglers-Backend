import { parsedProductOptions } from "../../../interfaces/product-options";
import { ParsedProduct } from "../../../interfaces/products";

const parseProduct = (product: any): ParsedProduct => {
    const variations = product.variations.map((productOption: any) => {
        return parsedProductOptions(productOption);
    });
    const data: ParsedProduct = {
        id: product.id,
        name: product.name,
        MOQ: product.MOQ,
        category: product.category,
        description: product.description,
        images: product.images,
        slug: product.slug,
        status: product.status,
        type: product.type,
        tax_rate_id: product.tax_rate_id,
        vendorId: product.vendorId,
        createdBy: product.createdByUser,
        updatedBy: product.updatedByUser,
        deletedBy: product.deletedByUser,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt,
        variations: variations
    
    };
    
    return data;
}

export { parseProduct };
