export interface IContract {
    id: string;
    status: CONTRACT_STATUS;
    terminationDetails: null | {
        id: string;
        reason: string;
        date: Date;
    }
    doc: ContractDocumentDetails | null;
    payment: ContractPaymentDetails | null;
    userId: string;
    leadId: string;
    templateId: string;
    amount: number;
    signedDate: Date | null;
    dueDate: Date;
    validity: {
        to: Date,
        from: Date
    };
    additionalInfo: string,
    createdBy: string,
    updatedBy: string | null;
    deletedBy: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export enum CONTRACT_STATUS {
    DRAFT = 'draft',
    ACTIVE = 'active',
    EXPIRED = 'expired',
    TERMINATED = 'terminated'
}

export interface ContractDocumentDetails {
    id: string;
    name: string;
    url: string;
    status: CONTRACT_DOCUMENT_STATUS;
    additionalInfo: string;
}

export interface ContractPaymentDetails {
    paymentId: string;
    amount: number;
    date: Date;
    status: CONTRACT_PAYMENT_STATUS;
    additionalInfo: string;
}

export enum CONTRACT_PAYMENT_STATUS {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAILED = 'failed'
}

export enum CONTRACT_DOCUMENT_STATUS {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected'
}