import { Coupon } from "apps/coupons/models/Coupon";
import { ParsedOrder } from "apps/order/interface/Order";
import { TUserWithPermission } from "types/admin/admin-user";

export interface CheckOutPageState {
    coupon: string[];
    order: ParsedOrder | null;
    tax: number;
    totalPrice: number;
    shippingCost: number;
    discount: number;
    inValidCoupon: boolean;
    couponApplied: boolean;
    discountCalcLoad: boolean;
    calculationResult: null;
    shippingAddTitle: string | null;
    billingAddTitle: string | null;
}

export type AppliedCouponMap = Record<string, { coupon: Coupon; amount: number }>;
export type CouponValidationResult = {
    order: ParsedOrder;
    appliedCouponMap: AppliedCouponMap;
    issues: CouponIssues;
};

export type CouponIssues = Record<string, { coupon: Coupon; message: string }>;

export type GetOrderResult = {
    couponObj: Coupon | null;
    studentCouponObj: Coupon | null;
    state: CheckOutPageState;
    couponIssues: CouponIssues;
    studentCouponIssues: CouponIssues;
    user: TUserWithPermission;
};

export interface CoreCouponValidateResult {
    order: ParsedOrder;
}

export interface CouponValidateResult extends CoreCouponValidateResult {
    inValidCoupon: boolean;
    couponObj: Coupon | null;
    issues: CouponIssues;
    hasAppliedCouponMap: boolean;
}

export interface StudentCouponValidateResult extends CoreCouponValidateResult {
    inValidStudentCoupon: boolean;
    studentCouponObj: Coupon | null;
    studentIssues: CouponIssues;
    hasAppliedStudentCouponMap: boolean;
}

export interface HandleCouponValidateResult extends CoreCouponValidateResult, CouponValidateResult {
    hasAppliedCouponMap: boolean;
    order: ParsedOrder;
    appliedCouponMap:AppliedCouponMap;
}

export interface WrapperValidateResult
    extends CoreCouponValidateResult,
        CouponValidateResult,
        StudentCouponValidateResult {}

export enum INVOICE_MODAL_MESSAGE {
    ZERO_ORDER = "Are you sure you wish to place order?",
    INVOICE_ORDER = "Are you sure you wish to continue with Invoice Payment?",
}


export interface WrapperValidateResult
    extends CoreCouponValidateResult,
        CouponValidateResult,
        StudentCouponValidateResult {}
