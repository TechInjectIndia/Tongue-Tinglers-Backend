import internal from 'stream';
import { CONTRACT_STATUS, ContractPaymentDetails, UserDetails, Note, ITrackable, SignDoc } from '../interfaces';

export interface TContract {
    id: string;
    status: CONTRACT_STATUS;
    terminationDetails: null | {
        UserDetails: UserDetails;
        reason: string;
        date: Date;
    }
    payment: ContractPaymentDetails[] | null;
    leadId: string;
    templateId: string;
    amount: number;
    signedDate: Date | null;
    dueDate: Date;
    validity: {
        to: Date,
        from: Date
    };
    notes: Note[] | null;
    additionalInfo: string,
    logs: ITrackable[] | null;
    signedDocs: SignDoc[] | null;
}

export interface TContractsList {
    total: number;
    data: TContract[];
}

export interface TContractPayload {
    status: CONTRACT_STATUS;
    terminationDetails: null | {
        UserDetails: UserDetails;
        reason: string;
        date: Date;
    }
    payment: ContractPaymentDetails[] | null;
    leadId: string;
    templateId: string;
    amount: number;
    signedDate: Date | null;
    dueDate: Date;
    validity: {
        to: Date,
        from: Date
    };
    notes: Note[] | null;
    additionalInfo: string,
    logs: ITrackable[] | null;
    signedDocs: SignDoc[] | null;
}

export type jsonData = {
    templates: {
        field_data: {
            field_text_data: {},
            field_boolean_data: {},
            field_date_data: {},
            field_radio_data: {}
        },
        actions: Actions[],
        notes: string
    }
};

interface Actions {
    recipient_name: string,
    recipient_email: string,
    action_id: string,
    action_type: string,
    signing_order: number,
    verify_recipient: string,
    private_notes: string
};