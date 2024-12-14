import { cart } from './../../../interfaces/user';
import { parsedVariations } from '../../../interfaces/cart_products';

const parseCartDetails = (cartDetail:any) => {
    const data = {
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