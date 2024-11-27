import type { UpdatedMetaData, BaseModel, DeletionMetaData } from ".";

interface ICommission extends BaseModel, UpdatedMetaData, DeletionMetaData {
    title: string,
    type: CommissionType,
    value: number,
    eventType: CommissionEventType,
}


enum CommissionType {
    ABSOLUTE = 'absolute',
    PERCENTAGE = 'percentage',
}

enum CommissionEventType {
    FRANCHISE_SOLD = 'franchise-sold',
    RAW_MATERIAL_SOLD = 'raw-material-sold',
}

export {
    ICommission,
    CommissionType,
    CommissionEventType,
}