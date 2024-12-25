import { ParseLead } from '../../../interfaces/leads'
import { parseUserToMetaUser } from '../../user/parser/user-parser'
const parseLead = (lead: any) => {
    console.log('lead>>>>>>>>>>>>>>: ', lead);

    if(!lead) return null;

    console.log("$$$$");



    const data: ParseLead = {
        id: lead.id,
        campaignId: lead.campaignId,
        status: lead.status,
        address: lead.address,
        additionalInfo: lead.additionalInfo,
        affiliate: lead.affiliate,
        email: lead.email,
        firstName: lead.firstName,
        lastName: lead.lastName,
        followDetails: [],
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
        createdBy: null,
        updatedAt: lead.updatedAt,
        updatedBy: lead.updater ? parseUserToMetaUser(lead.updater) : null,
        deletedAt: lead.deletedAt,
        deletedBy: lead.deleter ? parseUserToMetaUser(lead.deleter) : null,
        assignedUser: lead.assignee ? parseUserToMetaUser(lead.assignee) : null,
    }
    return data
}

export { parseLead }