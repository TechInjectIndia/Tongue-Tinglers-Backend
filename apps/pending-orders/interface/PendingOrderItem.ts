import { ParsedVariations } from "apps/cart-products/interface/Cart"
import { BaseMeta } from "apps/common/models/Base"
import { PRODUCTS_TYPE } from "apps/product/interface/Product"
import { MetaUser } from "apps/user/interface/user"

interface PendingOrderItemPayload {
    orderId: number,
    product: number,
    variation: number,
    quantity: number,
    price: Record<string, string | number>,
    totalPrice: number,
    totalTax: number,
    couponDiscount: number,
    type: PRODUCTS_TYPE 
}

interface PendingOrderItemTable extends PendingOrderItemPayload, BaseMeta {}

interface ParsedPendingOrderItem {
    id: number,
    variation: ParsedVariations,
    quantity: number,
    price: Record<string, string | number>,
    totalPrice: number,
    totalTax: number,
    couponDiscount: number,
    type: PRODUCTS_TYPE,
    createdBy: MetaUser,
    updatedBy: MetaUser | null,
    deletedBy: MetaUser | null,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}

export {PendingOrderItemPayload, PendingOrderItemTable, ParsedPendingOrderItem}