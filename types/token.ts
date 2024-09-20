export interface TToken {
    id: number;
    accessToken: string;
    isActive: boolean;
    tokenType: string;
    createdAt: Date;
    updatedAt: Date;
}

export type TemplateType = {
};

export type DocumentData = Record<string, any>;

export type SendResponse = {
    success: boolean;
    message: string;
    data?: any;
};

export type TemplateList = TemplateType[];

export interface Field {
    field_label: string;
    is_mandatory: boolean;
    field_category: string;
    default_value: string;
}

export interface Action {
    action_id: string,
    action_type: string,
}

export interface FieldType {
    docs: {
        documentId: string;
        fields: Field[];
    }[],
    actions: Action[];
}
