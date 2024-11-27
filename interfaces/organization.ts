import { IAddress } from "../types";
import { BaseMeta } from "../database/schema/base/Base";

interface BaseOrganization {
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    pan: string | null;
    gst: string | null;
    bankName: string;
    bankAccountNumber: string;
    bankIFSCCode: string;
    masterFranchiseId: number | null;
    rootUserId: number | null;
    type: ORGANIZATION_TYPE;
    businessType: BUSINESS_TYPE;
}


export interface IOrganizationPayload extends BaseOrganization {
    billingAddressId: number;
    shippingAddressId: Array<number>;
}

export interface  IOrganization extends IOrganizationPayload, BaseMeta {
}

export enum BUSINESS_TYPE {
    PROPRIETORSHIP = "proprietorship",
    PARTNERSHIP = "partnership",
    LLP = "llp", // Limited Liability Partnership
    PRIVATE_LIMITED = "private-limited",
    PUBLIC_LIMITED = "public-limited",
}

export enum ORGANIZATION_TYPE {
    MASTER_FRANCHISE = "master_franchise",
    ORGANIZATION = "organization",
    AFFILIATE = "affiliate",
}


export interface IOrganizationPayloadData extends BaseOrganization {
    billingAddress: IAddress;
    shippingAddress: Array<IAddress>;
}


export interface TOrganization {
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;

    pan: string | null;
    gst: string | null;

    bankName: string;
    bankAccountNumber: string;
    bankIFSCCode: string;

    billingAddressId: IAddress;
    shippingAddressId: Array<IAddress>;

    masterFranchiseId: number | null;
    createdBy: number;
    rootUserId: number | null;

    type: ORGANIZATION_TYPE;
    businessType: BUSINESS_TYPE;
}


