import {BaseMeta, ParsedMeta} from "apps/common/models/Base";
import { CommissionVoucherModel } from "../model/CommissionVoucherTable";
import {
    COMMISSION_PAID_STATUS,
    COMMISSION_VOUCHER_ENTITIES,
    CommissionEntityMappingModel
} from "../model/CommissionEntityMappingTable";
import { CommissionTable } from "../model/CommmisionTable";
import {ParsedFranchise} from "../../franchise/interface/Franchise";
import {ParsedOrder} from "../../order/interface/Order";
import {PayoutStatus} from "../model/CommissionPayoutTable";

// Interface behind Commission Model
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





type CommissionDetails = CommissionVoucherModel & {
    commissionEntity: CommissionEntityMappingModel
} & CommissionTable;

interface Customer {
    name: string,
    email: string,
    phone: string,
}

interface OrganizationPaymentDetails {
    organizationId: number,
    name: string,
    amount: number,
    email : string,
    phone : string,
    account_number: string,
    ifsc : string,
    voucherId: number
}



// parsed commission

interface  ParsedCommission  extends  ParsedMeta{
    id: number,
    title: string,
    type: CommissionType,
    value: number,
    eventType: CommissionEventType,
}


interface ICommissionVoucher extends BaseMeta {
    relationId: number, // many-to-many join Table id, FK
    entityId: number,
    entityType: COMMISSION_VOUCHER_ENTITIES, // order | franchise
    status: COMMISSION_PAID_STATUS,
}


interface  ParsedVoucher extends  ParsedMeta {
    id: number;
    relationId: number;
    entity: ParsedFranchise | ParsedOrder;
    entityType: COMMISSION_VOUCHER_ENTITIES;
    status: COMMISSION_PAID_STATUS;
    value: number;
}

interface  ParsedPayout extends  ParsedMeta{
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
    OrganizationPaymentDetails
}
