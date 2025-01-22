import { ParsedOrder } from "apps/order/interface/Order";
import { InvoiceAddress } from "../models/Invoice";
import * as fs from 'fs';

export const getTotalDiscount = (order: ParsedOrder) => {
    let totalDiscount: number = 0;

    order.items.forEach((item) => {
        totalDiscount += item.totalDiscount * item.quantity;
    });

    return totalDiscount;
};

export const getStringFromAddress = (address: InvoiceAddress ) => {
    return `${address.line} ${address.city}, ${address.city}, ${address.country} ${address.pincode}`;
}
// export const getTotalAddonAndExDiscPrice = (cartItem: CartItem) => {
//     return cartItem.totalPrice ;
// };
// export const getCartTotalWithOutFormating = (cartItemsArr: CartItem[]) => {
//     let totalPrice: number = 0;
//     cartItemsArr.forEach((item: CartItem) => {
//         totalPrice += item.totalPrice * item.quantity;
//     });
//     return totalPrice;
// };

// export const getCartTotal = (cartItemsArr: CartItem[]) => {
//     let totalPrice: number = 0;

//     cartItemsArr.forEach((item: CartItem) => {
//         totalPrice += item.totalPrice * item.quantity;
//     });

//     return totalPrice;
// };



// export const getProductTotalPrice = (price: Record<PRICE_COMP_TYPE, IPriceComponent>) => {
//     let total = 0;
//     Object.values(price).forEach((v) => {
//         total += v.value;
//     })
//     return total;
// }

// export const getOrderSubTotal = (order: Order) => {
//     let subTotal: number = 0;
//     order.items.forEach((item) => {
//         Object.values(item.price).forEach((v) => {
//             subTotal += (v.value * item.quantity);
//         });
//     });

//     return subTotal
// };

export function saveBuffersAsPDF(bufferArray,) {

    
    fs.mkdirSync('./', { recursive: true }); // Create the directory if it doesn't exist

    // bufferArray.forEach((buffer, index) => {
        const fileName = `a.pdf`; // e.g., "document_1.pdf"
        const filePath = `${'./'}/${fileName}`;
        fs.writeFileSync(filePath, bufferArray);
    // });
}