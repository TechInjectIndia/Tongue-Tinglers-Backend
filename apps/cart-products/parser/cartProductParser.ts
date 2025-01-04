import { ParsedCartProductDetails } from "apps/cart-details/interface/CartDetail";
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

const parseCartProductDetails=(cart: any)=>{
    console.log(cart);

    const data: ParsedCartProductDetails={
        id: cart.id,
        product: {
            id: cart.product.id,
            name: cart.product.name
        },
        variation: parsedVariations(cart.variations),
        quantity: cart.quantity
    }

    return data
}

export {parseCartProduct ,parseCartProductDetails}
