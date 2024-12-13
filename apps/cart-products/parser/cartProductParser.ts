import { parsedProductOptions } from './../../../interfaces/product-options';
import {ParsedCartProduct, parsedVariations} from "../../../interfaces/cart_products"
import { parseProduct } from "../../product/parser/productParser";

const parseCartProduct = (cart: any): ParsedCartProduct => {
    const data: ParsedCartProduct = {
        id: cart.id,
        product: cart.product,
        variation: parsedVariations(cart.variations),
        quantity: cart.quantity,
    };
    return data
}

export {parseCartProduct}