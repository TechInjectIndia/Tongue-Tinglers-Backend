import { BaseMeta } from "apps/common/models/Base";
import { Note } from "../../lead/interface/lead";
import { ParseLead } from "apps/lead/interface/lead";
import { ParsedOrganization } from "../../organization/interface/organization";
import { ParsedUser } from "apps/user/interface/User";
enum CONTRACT_PAYMENT_STATUS {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed",
}

enum CONTRACT_DOCUMENT_STATUS {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
}

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

enum SIGN_STATUS {
    PENDING = "pending",
    COMPLETED = "completed",
}

interface IContract extends BaseMeta {
    id: number;
    status: CONTRACT_STATUS;
    proposalData: number | null;
    terminationDetails: null | {
        UserDetails: number; // updated
        reason: string;
        date: Date;
    };
    organizationId: number | null;
    payment: ContractPaymentDetails[] | null;
    leadId: number;
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
    signedDocs: SignDoc[] | null; //update
}

interface SignDoc {
    docId: number | null;
    sentBy: number;
    createdAt: Date;
    status: SIGN_STATUS;
    docLink: string | null;
    signedDate: Date | null;
    notes: string | null;
}

interface ContractPaymentDetails {
    paymentId: string;
    amount: number;
    date: Date;
    status: CONTRACT_PAYMENT_STATUS;
    additionalInfo: string;
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
    sentBy: number;
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
        UserDetails: number;
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
    proposalData: number | null;

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
    CONTRACT_DOCUMENT_STATUS,
    SignDoc,
    type IContract,
    type ContractPaymentDetails,
    SIGN_STATUS,
    ContractTable,
    ParsedContract,
    
};
