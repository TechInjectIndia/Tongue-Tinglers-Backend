import { Address, BaseAddress, ParsedAddress } from "apps/address/interface/Address";
import {BaseMeta, BaseMetaUsers, ParsedMeta} from "apps/common/models/Base";
import { ParsedUser } from "apps/user/interface/user";


export enum ORGANIZATION_TYPE {
    SUPER_FRANCHISE='super_franchise',
    MASTER_FRANCHISE = "master_franchise",
    ORGANIZATION = "organization",
    AFFILIATE = "affiliate",
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

export interface OrganizationPayload {
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
    billingAddressId: number | null;
    billingAddress?: BaseAddress;
    shippingAddress?: Array<BaseAddress>;
}

export interface OrganizationTable extends OrganizationPayload, BaseMeta{}

export interface OrganizationAddressPayload {
    billingAddress?: Address;
    shippingAddress?: Array<Address>;
}



interface BaseOrganization extends BankDetails{
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    pan: string | null;
    gst: string | null;
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




export interface IOrganizationPayloadData extends BaseOrganization, BaseMetaUsers {
    billingAddress: BaseAddress;
    shippingAddress: Array<BaseAddress>;
}

export interface IOrganizationPayloadDataWithMeta extends IOrganizationPayloadData, BaseMeta {

}

export interface Organization {

}

export interface BankDetails {
    bankName: string;
    bankAccountNumber: string;
    bankIFSCCode: string;
}

export interface ParsedOrganization extends ParsedMeta, BankDetails {
    id: number;
    user: ParsedUser;
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    pan: string | null;
    gst: string | null;
    billingAddress: ParsedAddress;
    shippingAddress: Array<ParsedAddress>;
    masterFranchise: ParsedOrganization | null;
    type: ORGANIZATION_TYPE;
    businessType: BUSINESS_TYPE;
}

export interface OrganizationAddresses {
    billingAddress: ParsedAddress;
    shippingAddress: Array<ParsedAddress>;
}
