
type ChecklistItemOptions =
    | 'Contract Review'
    | 'Payment Verification'
    | 'DocuSign Status'
    | 'Franchisee Agreement'
    | 'Initial Inspection'
    | 'Other';

interface PdiChecklistItem {
    item: ChecklistItemOptions,
    status: followStatus,
    remarks?: string,
    followUpRequired?: boolean,
}

type TPdiChecklistList = {
    total: number,
    data: IPdiChecklist[]
}

enum followStatus {
    PENDING = "Pending",
    COMPLETED = "Completed",
    FAILED = "Failed",
}

enum IPdiChecklistStatus {
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed",
}

type TPdiChecklistPayload = {
    franchiseeId: string;
    checklistName: string;
    pdiDate: Date;
    status: IPdiChecklistStatus;
    items: PdiChecklistItem[];
};

interface IPdiChecklist {
    id: string,
    franchiseeId: string,
    checklistName: string,
    pdiDate: Date,
    status: IPdiChecklistStatus,
    items: PdiChecklistItem[],
}

export {
    IPdiChecklist,
    PdiChecklistItem,
    ChecklistItemOptions,
    IPdiChecklistStatus,
    TPdiChecklistPayload,
    TPdiChecklistList
}