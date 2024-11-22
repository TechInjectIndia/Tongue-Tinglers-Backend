import { BaseModelIdNumber, DeletionMetaData, UpdatedMetaData } from ".";

interface IOrganization extends UpdatedMetaData, BaseModelIdNumber, DeletionMetaData {
    id: number;
    prospectId: number;
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    /* Address is separate a table  */
    addressId: number;
    pan: string | null;
    gst: string | null;
    bankName: string;
    bankAccountNumber: string;
    bankIFSCCode: string;
    masterFranchiseId: number | null;
}

interface IOrganizationPayload {
    prospectId: number;
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    pan: string | null;
    gst: string | null;
    bankName: string;
    bankAccountNumber: string;
    bankIFSCCode: string;
    masterFranchiseId: number | null;
}

interface TOrganization {
    prospectId: number;
    name: string;
    contactPersonName: string;
    contactNumber: string;
    contactEmail: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    pan: string | null;
    gst: string | null;
    bankName: string;
    bankAccountNumber: string;
    bankIFSCCode: string;
    masterFranchiseId: number | null;
    createdBy: number
}

export { type IOrganization, type IOrganizationPayload, type TOrganization };