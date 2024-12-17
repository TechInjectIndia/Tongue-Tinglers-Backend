import {ParseLead} from '../../../interfaces/leads'
const parseLead = (lead: ParseLead) => {
    const data: ParseLead = {
        id: lead.id,
        campaign: lead.campaign,
        status: lead.status,
        address: lead.address,
        additionalInfo: lead.additionalInfo,
        affiliate: lead.affiliate,
        email: lead.email,
        firstName: lead.firstName,
        lastName: lead.lastName,
        followDetails: lead.followDetails,
        franchiseModals: lead.franchiseModals,
        logs: lead.logs,
        marketing: lead.marketing,
        notes: lead.notes,
        phoneNumber: lead.phoneNumber,
        other: lead.other,
        referBy: lead.referBy,
        source: lead.source,
        sourceInfo: lead.sourceInfo,
        amount: lead.amount,
        proposalModalId: lead.proposalModalId,
        createdAt: lead.createdAt,
        createdBy: lead.createdBy,
        updatedAt: lead.updatedAt,
        updatedBy: lead.updatedBy,
        deletedAt: lead.deletedAt,
        deletedBy: lead.deletedBy
    }
    return data
}

export {parseLead}