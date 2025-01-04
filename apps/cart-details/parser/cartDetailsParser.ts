import { parsedVariations } from "apps/cart-products/interface/Cart";
import {ParsedCartDetail} from "../interface/CartDetail";

const parseCartDetails = (cartDetail:any) => {
    const data:ParsedCartDetail = {
        id: cartDetail.id,
        user: cartDetail.users,
        cart: cartDetail.cartProductses.map((cart: any) => {
            return {
                id: cart.id,
                product: cart.product,
                variation: parsedVariations(cart.variations),
                quantity: cart.quantity,
            }
        })
    }

    return data;
}

export {parseCartDetails}
