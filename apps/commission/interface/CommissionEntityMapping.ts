import { BaseMeta } from "../../common/models/Base";

enum COMMISSION_ENTITIES {
    AFFILIATE = "aff",
    MASTER_FRANCHISE = "mf",
}

enum COMMISSION_VOUCHER_ENTITIES {
    ORDER_COMMISSION = "oc",
    FRANCHISE_COMMISSION = "fc",
}

enum COMMISSION_PAID_STATUS {
    PENDING = "pending",
    PAID = "paid",
    HOLD = "hold",
}

type OrganizationCommissions = {
    franchiseId: number; // franchise being sold or franchise purchasing raw Material
    organizationId: number; // payable to organization
    commissionId: number; // commissionModelId
};

type OrganizationCommissionsResponse = {
    franchiseId: any;
    franchiseOrganization: {
        id: any;
        name: any;
    };
    commission: {
        id: any;
        title: any;
        type: any;
        eventType: any;
        value: any;
    };
    organization: {
        id: any;
        name: any;
    };
    appliedCommission: {
        franchiseAmount: any;
        commissionAmount: any;
    };
};

// relation of receiving party & franchise involved in trade - either sold / ordered RM
interface ICommissionEntityMapping extends BaseMeta, OrganizationCommissions {}

interface IParsedCommissionEntityMappingResponse
    extends BaseMeta,
        // OrganizationCommissions,
        OrganizationCommissionsResponse {}

export {
    IParsedCommissionEntityMappingResponse,
    COMMISSION_ENTITIES,
    COMMISSION_VOUCHER_ENTITIES,
    COMMISSION_PAID_STATUS,
    OrganizationCommissions,
    ICommissionEntityMapping,
};
