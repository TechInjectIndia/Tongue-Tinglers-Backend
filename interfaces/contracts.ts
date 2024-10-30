import type {
    UpdatedMetaData,
    BaseModel,
    DeletionMetaData,
    ITrackable,
    Note,
    UserDetails,
} from "../interfaces";

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

interface IContract extends UpdatedMetaData, BaseModel, DeletionMetaData {
    id: string;
    status: CONTRACT_STATUS;
    terminationDetails: null | { // it should be in different table and assocaite it  
        UserDetails: UserDetails; // updated
        reason: string;
        date: Date;
    };
    payment: ContractPaymentDetails[] | null; // it should be in different table and assocaite it   
    leadId: string;
    templateId: string;
    amount: number;
    signedDate: Date | null;
    dueDate: Date;
    validity: {
        to: Date;
        from: Date;
    };
    notes: Note[] | null; // it should be in different table and assocaite it  
    additionalInfo: string;
    logs: ITrackable[] | null; //update // it should be in different table and assocaite it  
    signedDocs: SignDoc[] | null; //update // it should be in different table and assocaite it  
}

interface SignDoc {
    docId: string | null;
    sentBy: UserDetails;
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
