import { ParsedFollowDetails } from "apps/follow-details/interface/followDetails";
import { ParsedLead } from "../interface/lead";
import { parseFollowDetails } from "apps/follow-details/parser/followDetailsParser";
import { ParsedAffiliate } from "apps/affiliate/interface/affiliate";
import { ParseAffiliate } from "apps/affiliate/parser/affilateParser";
import { ParseProposal } from "apps/proposal_model/parser/proposalParser";
import { parseUserToMetaUser } from "apps/user/parser/user-parser";
import { ParsedFranchiseModels } from "apps/franchise_model/interface/franchiseModel";
import { ParseFranchiseModel } from "apps/franchise_model/parser/franchiseModelParser";


const parseLead = (lead: any): ParsedLead => {
    console.log("lead: ", lead);
    if (!lead) return null;

    const data: ParsedLead = {
        id: lead.id,
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phoneNumber: lead.phoneNumber,
        address: lead.address,
        additionalInfo: lead.additionalInfo,
        amount: lead.amount,
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
