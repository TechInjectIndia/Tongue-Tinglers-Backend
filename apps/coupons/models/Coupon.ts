import { BaseModel, DeletionMetaData, UpdatedMetaData } from "../../common/models/base-models";
import type{ IdTitle } from "../../product/models/Product";


export interface Coupon extends BaseModel, UpdatedMetaData, DeletionMetaData {
    code: string;
    amount: number; // represents the amount which is to be deducted, percentage or absolute amount
    discountType: DISCOUNT_TYPE;
    title: string;
    description: string;
    status: COUPON_STATUS; // true is active, false is inactive

    startDate: Date | null;
    endDate: Date | null;
    usageCount: number;
    restriction: Restriction;
    usageLimit: {
        count: number | null; // represents total limit of the number of times the coupon can be used
        perUserCount: number | null; // represents how many times a user can use this coupon
    };
}

export interface Restriction {
    minSpend: number | null;
    maxSpend: number | null;
    singleUse: boolean;
    excludeOutlet: boolean;
    products: IdTitle[] | null;
    excludeProducts: IdTitle[] | null;
    categories: IdTitle[] | null;
    excludeCategories: IdTitle[] | null;
    users: IdTitle[] | null;
    excludeUsers: IdTitle[] | null;
}

export enum COUPON_STATUS {
    ACTIVE = "active",
    INACTIVE = "inactive",
    EXPIRED = "expired",
    USED = "used",
}

 export enum DISCOUNT_TYPE {
    PERCENTAGE = "percentage",
    ABSOLUTE = "absolute",
}

export enum COUPON_SEARCH_FIELDS {
    ID = "id",
    CODE = "code",
    IS_STUDENT = "isStudent",
    USER_TYPES = "restriction.userTypes",
    MIN_SPEND = "restriction.minSpend",
    MAX_SPEND = "restriction.maxSpend",
    START_DATE = "startDate",
    END_DATE = "endDate",
}


export enum COUPON_VALIDATION_FIELDS {
    "STATUS" = "status",
    "END_DATE" = "endDate",
    "CODE" = "code",
}

export type CouponIssues = Record<string, { coupon: Coupon; message: string }>;

