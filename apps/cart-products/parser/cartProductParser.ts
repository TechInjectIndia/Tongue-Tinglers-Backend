import {ParsedCartProduct, parsedVariations} from "../interface/Cart";

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
