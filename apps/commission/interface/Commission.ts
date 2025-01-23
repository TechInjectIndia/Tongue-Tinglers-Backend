import {BaseMeta, ParsedMeta} from "apps/common/models/Base";
import {
    CommissionVoucherModel
} from "apps/commission/model/CommissionVoucherTable";

import {CommissionTable} from "apps/commission/model/CommmisionTable";
import {ParsedFranchise} from "apps/franchise/interface/Franchise";
import {ParsedOrder} from "apps/order/interface/Order";
import {PayoutStatus} from "apps/commission/model/CommissionPayoutTable";
import {ParsedOrganization} from "apps/organization/interface/organization";
import {
    COMMISSION_PAID_STATUS,
    COMMISSION_VOUCHER_ENTITIES,
} from "apps/commission/interface/CommissionEntityMapping";
import CommissionEntityMappingModel
    from "apps/commission/model/CommissionEntityMappingTable";

// Interface behind Commission Model
interface ICommission extends BaseMeta {
    title: string;
    type: CommissionType;
    value: number;
    eventType: CommissionEventType;
}

enum CommissionType {
    ABSOLUTE = "absolute",
    PERCENTAGE = "percentage",
}

enum CommissionEventType {
    MASTER_FRANCHISE_FRANCHISE_SOLD = "master-franchise-franchise-sold",
    MASTER_FRANCHISE_RAW_MATERIAL_SOLD = "master-franchise-raw-material-sold",
    AFFILIATE_FRANCHISE_SOLD = "affiliate-franchise-sold",
    AFFILIATE_RAW_MATERIAL_SOLD = "affiliate-raw-material-sold",
}

type CommissionDetails = CommissionVoucherModel & {
    commissionEntity: CommissionEntityMappingModel;
} & CommissionTable;

interface Customer {
    name: string;
    email: string;
    phone: string;
}

interface OrganizationPaymentDetails {
    organizationId: number;
    name: string;
    amount: number;
    email: string;
    phone: string;
    account_number: string;
    ifsc: string;
    voucherId: number;
}

// parsed commission

interface ParsedCommission extends ParsedMeta {
    id: number;
    title: string;
    type: CommissionType;
    value: number;
    eventType: CommissionEventType;
}

interface ParsedVoucher extends ParsedMeta {
    id: number;
    relationId: number;
    entity: ParsedFranchise | ParsedOrder;
    entityType: COMMISSION_VOUCHER_ENTITIES;
    status: COMMISSION_PAID_STATUS;
    value: number;
}

interface ParsedCommissionEntityMapping extends ParsedMeta {
    id: number;
    franchise: ParsedFranchise;
    relations: {
        organization: ParsedOrganization;
        commission: ParsedCommission;
    }[];
}

interface ParsedPayout extends ParsedMeta {
    id: number;
    voucherId: number;
    fundAccountId: string;
    amount: number;
    currency: string;
    status: PayoutStatus;
}


export {
    ICommission,
    CommissionType,
    CommissionEventType,
    CommissionDetails,
    Customer,
    OrganizationPaymentDetails,
    ParsedCommission,
    ParsedVoucher,
    ParsedPayout,
    ParsedCommissionEntityMapping,
};
