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

export {
    ParsedCartDetail,
    ParsedCartProductDetails
}