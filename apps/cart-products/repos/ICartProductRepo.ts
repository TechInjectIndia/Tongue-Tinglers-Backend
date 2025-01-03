import {
    CartProduct,
    ParseCart,
    ParsedCartProduct,
    UpdateQuantity
} from "../interface/Cart";


export interface ICartProductRepo {
    create(product:any): Promise<ParseCart | null>;

    update(product: CartProduct): Promise<CartProduct>;

    delete(id: number): Promise<CartProduct>;

    //todo nitesh remove other UpdateQuantities
    updateQuantity(cartProduct: UpdateQuantity): Promise<CartProduct>;

    getCartById(id: number): Promise<ParsedCartProduct>;

    clearUserCart(userId: number);
}
