import { ParseLead } from '../../../interfaces/leads'
import { parseUserToMetaUser } from '../../user/parser/user-parser'
const parseLead = (lead: any) => {
    const data: ParseLead = {
        id: lead.id,
        campaign: lead.campaign_ad,
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
        deletedBy: lead.deletedBy,
        assignedUser: parseUserToMetaUser(lead.assignee)
    }
    return data
}

export { parseLead }