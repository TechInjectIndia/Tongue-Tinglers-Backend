import { BaseMeta } from "apps/common/models/Base";
import { CommissionVoucherModel } from "../model/CommissionVoucherTable";
import { CommissionEntityMappingModel } from "../model/CommissionEntityMappingTable";
import { OrganizationModel } from "apps/organization/models/OrganizationTable";
import { CommissionTable } from "../model/CommmisionTable";

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

interface BankAccount{
    account_number: string,
    name: string,
    ifsc: string,

}


interface organizationPaymentDetails {
    organizationId: number,
    name: string,
    amount: number,
    email : string,
    phone : string,
    account_number: string,
    ifsc : string,
}

export {
    ICommission,
    CommissionType,
    CommissionEventType,
    CommissionDetails,
    Customer,
    BankAccount,
    organizationPaymentDetails
}
