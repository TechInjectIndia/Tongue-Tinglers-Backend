import { ParseFranchiseModel } from "../../franchise_model/parser/franchiseModelParser";
import { ParsedProposal } from "../interface/proposal";
import { parseUserToMetaUser } from "../../user/parser/user-parser"
const ParseProposal = (proposal: any): ParsedProposal => {
    const data: ParsedProposal = {
        id: proposal.id,
        title: proposal.title,
        prices: proposal.prices,
        franchiseModel: proposal.franchiseModelObj ? ParseFranchiseModel(proposal.franchiseModelObj) : null,
        createdBy: proposal.createdBy ? proposal.createdBy : null,
        createdAt: proposal.createdAt,
        updatedBy: proposal.updatedBy ? proposal.updatedBy : null,
        updatedAt: proposal.updatedAt,
        deletedBy: proposal.deletedBy ? proposal.deletedBy : null,
        deletedAt: proposal.deletedAt
    }
    return data;
}
export { ParseProposal }