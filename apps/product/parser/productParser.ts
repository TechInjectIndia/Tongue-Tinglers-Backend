import { parsedProductOptions } from "../../../interfaces/product-options";
import { ParsedProduct } from "../../../interfaces/products";

const parseProduct = (product: any): ParsedProduct => {
    const productVariations = product.options.map((product_option) =>
        parsedProductOptions(product_option)
    );
    const data: ParsedProduct = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        MOQ: product.MOQ,
        category: product.category,
        type: product.type,
        status: product.status,
        images: product.images,
        createdBy: product.createdByUser,
        updatedBy: product.updatedByUser,
        deletedBy: product.deletedByUser,
        tax_rate_id: product.tax_rate_id,
        variations: productVariations,
    };
    return data;
};

export { parseProduct };
