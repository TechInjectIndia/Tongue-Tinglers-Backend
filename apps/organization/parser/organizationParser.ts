import { OrganizationAddresses, ParsedOrganization } from "../interface/organization";

const parseOrganization = (organization: any) => {
    const data: ParsedOrganization = {
        id: organization.id,
        name: organization.name,
        contactPersonName: organization.contactPersonName,
        contactNumber: organization.contactNumber,
        contactEmail: organization.contactEmail,
        pan: organization.pan,
        gst: organization.gst,
        bankName: organization.bankName,
        bankAccountNumber: organization.bankAccountNumber,
        bankIFSCCode: organization.bankIFSCCode,
        masterFranchise: organization.masterFranchise,
        createdBy: organization.createdByUser,
        updatedBy: organization.updatedByUser,
        deletedBy: organization.deletedByUser,
        billingAddress: organization.billingAddress,
        shippingAddress: organization.shippingAddresses,
        businessType: organization.businessType,
        type: organization.type,
        createdAt: organization.createdAt,
        updatedAt: organization.updatedAt,
        deletedAt: organization.deletedAt,
        user: organization.user,
        logs: organization.logs
    }
    return data;
}

const parseOrganizationAddresses = (organization: any): OrganizationAddresses => {
    const data: OrganizationAddresses = {
        billingAddress: organization.billingAddress,
        shippingAddress: organization.shippingAddresses
    }
    return data;
}

export {parseOrganization, parseOrganizationAddresses}