import { BaseMeta } from "apps/common/models/Base";


interface ICommission extends BaseMeta {
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
    MASTER_FRANCHISE_FRANCHISE_SOLD = 'master-franchise-franchise-sold',
    MASTER_FRANCHISE_RAW_MATERIAL_SOLD = 'master-franchise-raw-material-sold',
    AFFILIATE_FRANCHISE_SOLD = 'affiliate-franchise-sold',
    AFFILIATE_RAW_MATERIAL_SOLD = 'affiliate-raw-material-sold',
}

export {
    ICommission,
    CommissionType,
    CommissionEventType,
}