import { ParsedProductOptions } from "./product-options"
import { ParsedProduct } from "./products"

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
interface ParseCart{
    user_id: any
    carts:Array<ParsedCartProduct>
}


interface ParsedCartProduct {
    id: number, // cartItemId
    product: ParsedProduct,
    variation: ParsedVariations,
    quantity: number,
}

interface ParsedVariations {
    id: number,
    optionsValue: ParsedProductOptions
    price: number,
    stock: number,
    status: string,
    images: string[],
    quantity: number

}

const parsedVariations = (variation: any): ParsedVariations => {
    const data: ParsedVariations = {
        id: variation.id,
        optionsValue: variation.optionsValue,
        price: variation.price,
        stock: variation.stock,
        status: variation.status,
        images: variation.images,
        quantity: variation.quantity
    }
    return data
}

export {
    BaseCartProduct,
    CartProduct,
    UpdateQuantity,
    Cart,
    ParsedCartProduct,
    parsedVariations,
    ParseCart
}
