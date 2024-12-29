

import { BaseMeta, BaseMetaUsers } from "apps/common/models/Base";
import { Address, BaseAddress, ParsedAddress } from "../types";
import { ParsedUser } from "./user";

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
    rootUser: number | null;
    type: ORGANIZATION_TYPE;
    businessType: BUSINESS_TYPE;
}


export interface IOrganizationPayload extends BaseOrganization {
    billingAddressId: number;
}

export interface IOrganization extends IOrganizationPayload, BaseMeta {
}

export enum BUSINESS_TYPE {
    PROPRIETORSHIP = "proprietorship",
    PARTNERSHIP = "partnership",
    LLP = "llp", // Limited Liability Partnership
    PRIVATE_LIMITED = "private-limited",
    PUBLIC_LIMITED = "public-limited",
}

export enum ORGANIZATION_TYPE {
    SUPER_FRANCHISE='super_franchise',
    MASTER_FRANCHISE = "master_franchise",
    ORGANIZATION = "organization",
    AFFILIATE = "affiliate",
}


export interface IOrganizationPayloadData extends BaseOrganization, BaseMetaUsers {
    billingAddress: BaseAddress;
    shippingAddress: Array<BaseAddress>;
}

export interface IOrganizationPayloadDataWithMeta extends IOrganizationPayloadData, BaseMeta {

}

export interface Organization {

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

    billingAddressId: Address;
    shippingAddressId: Array<Address>;

    masterFranchiseId: number | null;
    createdBy: number;
    rootUser: number | null;

    type: ORGANIZATION_TYPE;
    businessType: BUSINESS_TYPE;
}



export interface ParsedOrganization {
    id: number;
    user: ParsedUser;
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    pan: string | null;
    gst: string | null;
    bankName: string;
    bankAccountNumber: string;
    bankIFSCCode: string;
    billingAddress: ParsedAddress;
    shippingAddress: Array<ParsedAddress>;
    masterFranchise: ParsedOrganization | null;
    type: ORGANIZATION_TYPE;
    businessType: BUSINESS_TYPE;
    createdBy: ParsedUser;
    createdAt: Date;
    updatedBy: ParsedUser | null;
    updatedAt: Date;
    deletedBy: ParsedUser | null;
    deletedAt: Date;
}
