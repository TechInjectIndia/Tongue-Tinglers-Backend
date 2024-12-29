import { ParseLead } from "../interface/Lead";
import { parseUserToMetaUser } from "../../user/parser/user-parser";
import { ParseFranchiseModel } from "../../franchise_model/parser/franchiseModelParser";
import { ParseProposal } from "../../proposal_model/parser/proposalParser";
import { ParseAffiliate } from "../../affiliate/parser/affilateParser";
import { ParsedAffiliate } from "../../affiliate/interface/affiliate";
import { parseFollowDetails } from "../../follow-details/parser/followDetailsParser";
import { ParsedFollowDetails } from "../../follow-details/interface/followDetails";
import { ParsedFranchiseModels } from "../../franchise_model/interface/franchiseModel";
const parseLead = (lead: any): ParseLead => {
    console.log("lead: ", lead);
    if (!lead) return null;

    const data: ParseLead = {
        id: lead.id,
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phoneNumber: lead.phoneNumber,
        address: lead.address,
        additionalInfo: lead.additionalInfo,
        amount: lead.amount,
        logs: lead.logs,
        followDetails: lead.followDetails
            ? lead.followDetails.map((detail: ParsedFollowDetails) =>
                  parseFollowDetails(detail)
              )
            : [],
        affiliate: lead.affiliate
            ? lead.affiliate.map((affiliate: ParsedAffiliate) =>
                  ParseAffiliate(affiliate)
              )
            : [],
        marketing: lead.marketing,
        other: lead.other,
        proposalModalId: lead.proposalModalId
            ? ParseProposal(lead.proposalModalId)
            : null,
        assignedUser: lead.assignedUser
            ? parseUserToMetaUser(lead.assignedUser)
            : null,
        franchiseModals: lead.franchiseModals
            ? lead.franchiseModals.map((modal: ParsedFranchiseModels) =>
                  ParseFranchiseModel(modal)
              )
            : null,
        referBy: lead.referBy ? parseUserToMetaUser(lead.referBy) : null,
        notes: lead.notes,
        createdAt: lead.createdAt,
        createdBy: parseUserToMetaUser(lead.createdBy),
        updatedAt: lead.updatedAt,
        updatedBy: lead.updatedBy ? parseUserToMetaUser(lead.updatedBy) : null,
        deletedAt: lead.deletedAt,
        deletedBy: lead.deletedBy ? parseUserToMetaUser(lead.deletedBy) : null,
        campaignId: lead.campaign_ad,
        status: lead.status,
        source: lead.source,
        sourceInfo: lead.sourceInfo,
    };
    return data;
};

export { parseLead };
