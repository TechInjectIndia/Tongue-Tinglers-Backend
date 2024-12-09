import { ParsedOrganization } from "../../../interfaces/organization"

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
        masterFranchiseId: organization.masterFranchiseId,
        createdBy: organization.createdBy,
        updatedBy: organization.updatedBy,
        deletedBy: organization.deletedBy,
        billingAddress: organization.billingAddress,
        shippingAddress: organization.shippingAddresses,
        businessType: organization.businessType,
        type: organization.type,
        createdAt: organization.createdAt,
        updatedAt: organization.updatedAt,
        deletedAt: organization.deletedAt,
        user: organization.rootUser
    }
    return data;
}

export {parseOrganization}