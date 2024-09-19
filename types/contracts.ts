import { CONTRACT_STATUS } from '../interfaces';

export interface TContract {
    id: string;
    userId: string;
    leadId: string;
    templateId: string;
    amount: number;
    signedDate: Date | null;
    dueDate: Date;
    validity: {
        from: Date;
        to: Date;
    };
    status: CONTRACT_STATUS;
    additionalInfo: string;
    createdBy: string;
    updatedBy: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export interface TContractsList {
    total: number;
    data: TContract[];
}

export interface TEditContract {
    templateId?: string;
    amount?: number;
    signedDate?: Date | null;
    dueDate?: Date;
    validity: {
        from: Date;
        to: Date;
    };
    additionalInfo?: string;
    updatedBy?: string;
}

export interface TAddContract {
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