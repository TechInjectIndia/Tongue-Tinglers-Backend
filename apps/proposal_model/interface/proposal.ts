import { ParsedFranchiseModels } from "../../franchise_model/interface/franchiseModel";
import { ParsedUser } from "../../user/interface/User";

interface ProposalPayload {
    title: string;
    prices: string;
    franchiseModel: number;
}

interface ParsedProposal {
    id: number;
    title: string;
    prices: string;
    franchiseModel: ParsedFranchiseModels
    createdBy: ParsedUser;
    createdAt: Date;
    updatedBy: ParsedUser | null;
    updatedAt: Date;
    deletedBy: ParsedUser | null;
    deletedAt: Date | null;
}

export {ProposalPayload, ParsedProposal}