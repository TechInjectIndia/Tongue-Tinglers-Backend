import { BaseModelIdNumber, DeletionMetaData, UpdatedMetaData } from ".";

interface IOrganization
    extends UpdatedMetaData,
        BaseModelIdNumber,
        DeletionMetaData {
    id: number;
    prospectId: string;
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
    rootUserId: string | null;
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
    rootUserId: string | null;
}

interface TOrganization {
    rootUserId: string | null;
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
    createdBy: string;
}

export { type IOrganization, type IOrganizationPayload, type TOrganization };
