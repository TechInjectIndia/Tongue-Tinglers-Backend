import {ParsedOrderItem} from "../interface/orderItem";
import {parseProduct} from '../../product/parser/productParser'
import { parseUserToMetaUser } from "apps/user/parser/user-parser";
import { parseProductVariation } from "apps/product-options/parser/parseProductVariation";

const parseOrderItem = (orderItem: any): ParsedOrderItem => {
    console.log('orderItem: ', orderItem.variationData);

    if(orderItem && !orderItem.id){
        orderItem.id = 0;
    }

    const data: ParsedOrderItem = {
       id: orderItem.id,
       variation: orderItem.variationData ? parseProductVariation(orderItem.variationData) : null,
       couponDiscount: orderItem.couponDiscount,
       price: orderItem.price,
       totalPrice: orderItem.totalPrice,
       quantity: orderItem.quantity,
       totalTax: orderItem.totalTax,
       type: orderItem.type,
       createdBy: orderItem.createdByUser ? parseUserToMetaUser(orderItem.createdByUser) : null,
       updatedBy: orderItem.updatedByUser ? parseUserToMetaUser(orderItem.updatedByUser) : null,
       deletedBy: orderItem.deletedByUser ? parseUserToMetaUser(orderItem.deletedByUser) : null,
       createdAt: orderItem.createdAt,
       updatedAt: orderItem.updatedAt,
       deletedAt: orderItem.deletedAt
    };

    return data;
};

export {parseOrderItem}
