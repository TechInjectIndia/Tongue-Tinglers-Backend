import { BaseMeta } from "apps/common/models/Base";
import { Note, ProposalModels } from "apps/lead/interface/Lead";

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
    proposalData: ProposalModels | null;
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

export {
    CONTRACT_STATUS,
    CONTRACT_PAYMENT_STATUS,
    CONTRACT_DOCUMENT_STATUS,
    SignDoc,
    type IContract,
    type ContractPaymentDetails,
    SIGN_STATUS,
};
