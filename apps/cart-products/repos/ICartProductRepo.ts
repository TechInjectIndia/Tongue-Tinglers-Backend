import { BaseCartProduct, CartProduct, UpdateQuantity } from "../../../interfaces/cart_products";

export interface ICartProductRepo {
    create(product:any): Promise<any| null>;

    update(product: CartProduct): Promise<CartProduct>;

    delete(id: number): Promise<CartProduct>;

    updateQuantity(cartProduct: UpdateQuantity): Promise<CartProduct>;
}