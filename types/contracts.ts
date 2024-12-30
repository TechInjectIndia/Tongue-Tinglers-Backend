import { CONTRACT_STATUS, ContractPaymentDetails, SignDoc } from "apps/contracts/interface/Contract";
import { Note } from "apps/lead/interface/lead";

export interface TContract {
    id: number;
    status: CONTRACT_STATUS;
    terminationDetails: null | {
        UserDetails: number;
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
    signedDocs: SignDoc[] | null;
    createdBy: number;
}

export interface TContractsList {
    total: number;
    data: TContract[];
}

export interface TContractPayload {
    status: CONTRACT_STATUS;
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
}

export type jsonData = {
    templates: {
        field_data: {
            field_text_data: {};
            field_boolean_data: {};
            field_date_data: {};
            field_radio_data: {};
        };
        actions: Actions[];
        notes: string;
    };
};

interface Actions {
    recipient_name: string;
    recipient_email: string;
    action_id: string;
    action_type: string;
    signing_order: number;
    verify_recipient: string;
    private_notes: string;
}
