import { BaseModelIdNumber, DeletionMetaData, UpdatedMetaData } from ".";

interface IOrganization extends UpdatedMetaData, BaseModelIdNumber, DeletionMetaData {
    id: number;
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
    prospectId: string;
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



export { type IOrganization, type IOrganizationPayload };