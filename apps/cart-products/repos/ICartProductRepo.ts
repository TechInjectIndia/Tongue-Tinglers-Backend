import { ParsedCartDetail } from "apps/cart-details/interface/CartDetail";
import {
    CartProduct,
    ParseCart,
    ParsedCartProduct,
    UpdateQuantity
} from "../interface/Cart";


export interface ICartProductRepo {
    create(product:any): Promise<ParsedCartDetail | null>;

    update(product: CartProduct): Promise<CartProduct>;

    delete(id: number): Promise<CartProduct>;

    //todo nitesh remove other UpdateQuantities
    updateQuantity(cartProduct: UpdateQuantity): Promise<CartProduct>;

    getCartById(id: number): Promise<ParsedCartProduct>;

    clearUserCart(userId: number);
}
