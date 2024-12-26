import { ParseLead } from '../interface/lead'
import { parseUserToMetaUser } from '../../user/parser/user-parser'
import { ParseFranchiseModel } from '../../franchise_model/parser/franchiseModelParser'
import { ParseProposal } from '../../proposal_model/parser/proposalParser'
import { ParseAffiliate } from '../../affiliate/parser/affilateParser'
import { ParseFollowDetails } from '../../follow-details/parser/followDetailsParser'
const parseLead = (lead: ParseLead): ParseLead => {
    if(!lead) return null;

    const data: ParseLead = {
        id: lead.id,
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phoneNumber: lead.phoneNumber,
        address: lead.address,
        additionalInfo: lead.additionalInfo,
        amount: lead.amount,
        followDetails: lead.followDetails ? lead.followDetails.map((detail) => ParseFollowDetails(detail)) : null,
        affiliate: lead.affiliate ? lead.affiliate.map((affiliate)=> ParseAffiliate(affiliate)) : null,
        marketing: lead.marketing ? lead.marketing.map((market)=> parseUserToMetaUser(market)) : null,
        other: lead.other,
        proposalModalId: lead.proposalModalId ? ParseProposal(lead.proposalModalId) : null,
        assignedUser: lead.assignedUser ? parseUserToMetaUser(lead.assignedUser) : null,
        franchiseModals: lead.franchiseModals ? lead.franchiseModals.map((modal) => ParseFranchiseModel(modal) ) : null,
        referBy: lead.referBy ? parseUserToMetaUser(lead.referBy) : null,
        notes: lead.notes,
        createdAt: lead.createdAt,
        createdBy: parseUserToMetaUser(lead.createdBy),
        updatedAt: lead.updatedAt,
        updatedBy: lead.updatedBy ? parseUserToMetaUser(lead.updatedBy) : null,
        deletedAt: lead.deletedAt,
        deletedBy: lead.deletedBy ? parseUserToMetaUser(lead.deletedBy) : null,
        campaignId: lead.campaignId,
        status: lead.status,
        source: lead.source,
        sourceInfo: lead.sourceInfo
    }
    return data
}

export { parseLead }