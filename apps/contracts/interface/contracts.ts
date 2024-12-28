import { BaseMeta } from "../../../database/schema/base/Base";
import { ProposalModels } from "../../../interfaces";
import { ParsedOrganization } from "../../../interfaces/organization";
import { ParseLead } from "../../lead/interface/lead";
import { ITrackable, Note } from "../../lead/interface/lead";
import { ParsedUser } from "../../user/interface/user";

enum CONTRACT_STATUS {
    DRAFT = "DRAFT",
    ACTIVE = "ACTIVE",
    PAYMENT_LINK_SENT = "PAYMENT_LINK_SENT",
    PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
    SENT_SIGN = "SENT-SIGN",
    COMPLETED = "COMPLETED",
    EXPIRED = "EXPIRED",
    TERMINATED = "TERMINATED",
}

enum CONTRACT_PAYMENT_STATUS {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed",
}

enum SIGN_STATUS {
    PENDING = "pending",
    COMPLETED = "completed",
}

interface ContractPaymentDetails {
    paymentId: string;
    amount: number;
    date: Date;
    status: CONTRACT_PAYMENT_STATUS;
    additionalInfo: string;
}

interface UserDetails {
    id: number;
}

interface SignDoc {
    docId: number | null;
    sentBy: UserDetails;
    createdAt: Date;
    status: SIGN_STATUS;
    docLink: string | null;
    signedDate: Date | null;
    notes: string | null;
}

export interface ContractsPayload {
    status: CONTRACT_STATUS
    createdBy: number;
    terminationDetails: null | {
        UserDetails: UserDetails;
        reason: string;
        date: Date;
    };
    payment: ContractPaymentDetails[] | null;
    leadId: number;
    organizationId: number | null;
    templateId: string | null;
    amount: number;
    signedDate: Date | null;
    dueDate: Date;
    validity: {
        to: Date;
        from: Date;
    };
    notes: Note[] | null;
    additionalInfo: string;
    signedDocs: SignDoc[] | null;
    proposalData: ProposalModels | null;
    logs: ITrackable[] | null; //update
}

export interface PartialContractsUpdate {
    dueDate?: Date;
    validity?: {
        to: Date;
        from: Date;
    };
    templateId?: string | null;
}

interface ContractTable extends ContractsPayload, BaseMeta{}

interface ParsedContract {
    id: number;
    leadId: number;
    lead: ParseLead | null;
    organizationId:number | null;
    organization: ParsedOrganization | null;
    templateId: string | null;
    amount: number;
    signedDate: Date | null;
    dueDate: Date;
    validity: {
        to: Date;
        from: Date;
    };
    notes: Note[] | null;
    additionalInfo: string;
    logs: [] | null;
    signedDocs: SignDoc[] | null;
    createdAt: Date;
    createdBy: ParsedUser;
    updatedAt: Date | null;
    updatedBy: ParsedUser | null;
    deletedAt: Date | null;
    deletedBy: ParsedUser | null;
    payment: ContractPaymentDetails[];
    status: CONTRACT_STATUS;
}

export {
    CONTRACT_STATUS,
    CONTRACT_PAYMENT_STATUS,
    ContractTable,
    SignDoc,
    SIGN_STATUS,
    ParsedContract
};