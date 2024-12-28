import { BaseMeta } from "../../../database/schema/base/Base";
import { BaseAddress, ParsedAddress } from "../../../types";
import { ParsedUser } from "../../user/interface/user";

export enum ORGANIZATION_TYPE {
    SUPER_FRANCHISE='super_franchise',
    MASTER_FRANCHISE = "master_franchise",
    ORGANIZATION = "organization",
    AFFILIATE = "affiliate",
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

