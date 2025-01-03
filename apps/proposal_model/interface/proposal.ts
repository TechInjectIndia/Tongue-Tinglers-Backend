import { ParsedFranchiseModels } from "../../franchise_model/interface/franchiseModel";
import { ParsedUser } from "../../user/interface/user";

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


interface ProposalTable extends ProposalPayload {
    id: number,
    title: string,
    /* comma separated string */
    prices: string;
    franchiseModel: number;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date | null;
    updatedBy: number | null;
    deletedAt: Date | null;
    deletedBy: number | null;
}



type ProposalModelsList = {
    total: number;
    data: ProposalTable[];
};


export { ProposalPayload, ParsedProposal, ProposalTable, ProposalModelsList }