import { CONTRACT_STATUS, ContractDocumentDetails, ContractPaymentDetails } from '../interfaces';

export interface TContract {
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

export interface TContractsList {
    total: number;
    data: TContract[];
}

export interface TContractPayload {
    leadId?: string;
    userId?: string;
    status?: CONTRACT_STATUS;
    templateId?: string;
    amount?: number;
    signedDate?: Date | null;
    dueDate?: Date;
    validity: {
        from: Date;
        to: Date;
    };
    additionalInfo?: string;
    createdBy?: string;
}