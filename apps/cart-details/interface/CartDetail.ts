import { ParsedVariations } from "apps/cart-products/interface/Cart";
import { MetaUser } from "apps/user/interface/user";

interface ParsedCartDetail {
    id: number;
    user: MetaUser;
    cart: ParsedCartProductDetails[]
}

interface ParsedCartProductDetails {
    id: number;
    product:{
        id: number;
        name: string;
    };
    variation: ParsedVariations;
    quantity: number;
}

interface BaseCartDetails {
    user_id: number,
    // cart_ids: Array<number>
}

interface CartDetails extends BaseCartDetails {
    id: number
}

export {
    BaseCartDetails,
    CartDetails,
    ParsedCartDetail,
    ParsedCartProductDetails
}
