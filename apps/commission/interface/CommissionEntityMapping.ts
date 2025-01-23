import {BaseMeta} from "apps/common/models/Base";


enum COMMISSION_ENTITIES {
    AFFILIATE = 'aff',
    MASTER_FRANCHISE = 'mf',
}


enum COMMISSION_VOUCHER_ENTITIES {
    ORDER_COMMISSION = 'oc',
    FRANCHISE_COMMISSION = 'fc',
}

enum COMMISSION_PAID_STATUS {
    PENDING = 'pending',
    PAID = 'paid',
    HOLD = 'hold'
}

type OrganizationCommissions = {
    franchiseId: number; // franchise being sold or franchise purchasing raw
                         // Material
    organizationId: number; // payable to organization
    commissionId: number; // commissionModelId
}

// relation of receiving party & franchise involved in trade - either sold /
// ordered RM
interface ICommissionEntityMapping extends BaseMeta, OrganizationCommissions {

}

export {
    COMMISSION_ENTITIES,
    COMMISSION_VOUCHER_ENTITIES,
    COMMISSION_PAID_STATUS,
    OrganizationCommissions,
    ICommissionEntityMapping
};
