interface BaseCartProduct {
    product_id: number,
    product_option_id: number,
    quantity: number
}



interface CartProduct extends BaseCartProduct {
    id: number
}

interface UpdateQuantity {
    id: number,
    product_id: number,
    product_option_id: number,
    quantity: number
}

interface Cart{
    user_id: any
    carts:Array<BaseCartProduct>
}



export {
    BaseCartProduct,
    CartProduct,
    UpdateQuantity,
    Cart
}