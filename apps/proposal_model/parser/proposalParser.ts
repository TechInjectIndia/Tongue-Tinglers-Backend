import { ParseFranchiseModel } from "../../franchise_model/parser/franchiseModelParser";
import { ParsedProposal } from "../interface/proposal";
import {parseUserToMetaUser} from "../../user/parser/user-parser"
const ParseProposal = (proposal: ParsedProposal): ParsedProposal => {
    const data:ParsedProposal = {
        id: proposal.id,
        title: proposal.title,
        prices: proposal.prices,
        franchiseModel: proposal.franchiseModel ? ParseFranchiseModel(proposal.franchiseModel) : null,
        createdBy: proposal.createdBy ? parseUserToMetaUser(proposal.createdBy) : null,
        createdAt: proposal.createdAt,
        updatedBy: proposal.updatedBy ? parseUserToMetaUser(proposal.updatedBy) : null,
        updatedAt: proposal.updatedAt,
        deletedBy: proposal.deletedBy ? parseUserToMetaUser(proposal.deletedBy) : null,
        deletedAt: proposal.deletedAt
    } 
    return data;
}
export {ParseProposal}