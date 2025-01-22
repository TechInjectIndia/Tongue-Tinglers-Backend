import { ParsedMeta } from "apps/common/models/Base";
import { ParsedProduct } from "apps/product/interface/Product";
import { ParsedVariations } from "apps/product/interface/ProductOptions";
// import { ParsedProductOptions } from "apps/product/interface/ProductOptions";


interface BaseOrderItem {
    product_id: number,
    product_option_id: number,
    quantity: number,
    total_price: number,
    total_tax: number,
    coupon_discount: number,
    points_discount: number,
    student_discount: number,
    type: ORDER_ITEM_TYPE
}

interface PriceComponent {

    type: PRICE_COMP_TYPE_CART | SHIPPING_CHARGES_TYPE;
	percent: number; // value percent
	taxPercent: number; // taxPercent
	value: number; // component
	tax: number; //abs tax
	calc: VALUE_TYPE; // calc method for price Comp
}

export enum PRICE_COMP_TYPE_CART {
	BASE_PRICE = "base-price",
}


export enum SHIPPING_CHARGES_TYPE {
    IN_STOCK = "in-stock",
    REWARD_POINTS_DISC = "reward-points-disc",
}


export enum PRICE_COMP_TYPE{
    BASE_PRICE = "base-price",
	ADDON = "addon",
}
export enum DISCOUNT_COMP_TYPE {
    COUPON_DISCOUNT = "coupon-discount",
    CLEARANCE = "clearance",
    REWARD_POINTS = "reward-points",
    STUDENT_COUPON_DISCOUNT = "student-coupon-discount",
}
export enum VALUE_TYPE {
	ABSOLUTE = "absolute",
	PERCENTAGE = "percentage",
}


export interface IDiscComponent {
	percent: number;    // valuePercent
	taxPercent: number; // taxPercent
	type: DISCOUNT_COMP_TYPE;
	value: number; //ex vat value
	tax: number; // auto calculate
	calc: VALUE_TYPE;
}


interface PreSaleParsedOrderItem {
    product: ParsedProduct,
    productOption: ParsedVariations,
    quantity: number,
    total_price: number,
    totalTax: number,
    prices: Record<string, PriceComponent>;
    disc: Record<string, IDiscComponent>;
    type: ORDER_ITEM_TYPE
    // order_items?: ParsedOrderItem[];
}

interface ParsedOrderItem extends PreSaleParsedOrderItem {
    id: number;
    totalDiscount: number
}

enum ORDER_ITEM_TYPE {
    RETORT = 'retort',
    PACKAGING = 'packaging'
}

interface OrderItem extends BaseOrderItem, ParsedMeta {
    id: number
}

interface UpdateQuantity extends OrderItem {
    quantity: number
}

interface UpdateCouponDiscount extends OrderItem {
    coupon_discount: number
}

interface UpdatePointsDiscount extends OrderItem {
    points_discount: number
}

interface UpdateStudentDiscount extends OrderItem {
    student_discount: number
}

export {
    OrderItem,
    BaseOrderItem,
    ORDER_ITEM_TYPE,
    UpdateQuantity,
    UpdateCouponDiscount,
    UpdatePointsDiscount,
    UpdateStudentDiscount,
    ParsedOrderItem,
    PriceComponent,
    PreSaleParsedOrderItem
}
