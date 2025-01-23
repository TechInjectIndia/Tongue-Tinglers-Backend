import { APIResponse } from "apps/common/models/Base";
import { ICommission } from "../interface/Commission";
import {
    ICommission,
    ParsedCommission,
    ParsedCommissionEntityMapping,
    ParsedVoucher,
} from "../interface/Commission";
import { CommissionVoucherCreationAttributes } from "../model/CommissionEntityMappingTable";
import { ICommissionVoucher } from "../model/CommissionVoucherTable";
import { DTO } from "apps/common/models/DTO";
import {
    COMMISSION_PAID_STATUS,
    COMMISSION_VOUCHER_ENTITIES,
    ICommissionEntityMapping,
    OrganizationCommissions,
} from "../interface/CommissionEntityMapping";
import { IParsedCommissionEntityMappingResponse } from "../interface/CommissionEntityMapping";

export interface ICommissionRepo {
    isTitleAlreadyExists(title: string): Promise<DTO<boolean>>;

    search(searchText: string, type?: string): Promise<DTO<ParsedCommission[]>>;

    //     - create commission - DTO<ParsedCommission|null>
    create(commission: ICommission): Promise<DTO<ParsedCommission>>;

    update(id: number, commission: ICommission): Promise<APIResponse<boolean>>;

    delete(ids: number[], deletedById: number): Promise<APIResponse<boolean>>;

    getAll(): Promise<APIResponse<ICommission[]>>;

    getById(id: number): Promise<APIResponse<ICommission>>;

    //     - create commission mapping - DTO<ParsedCommissionEntityMapping>
    createCommissionMapping(
        mapEntities: CommissionVoucherCreationAttributes[],
        options?: {
            transaction?: any;
        },
    ): Promise<DTO<ParsedCommissionEntityMapping>>;

    //     - update commission mapping - DTO<ParsedCommissionEntityMapping>
    updateCommissionMapping(
        id: number,
        mapEntity: ICommissionEntityMapping,
    ): Promise<DTO<ParsedCommissionEntityMapping>>;

    // get all commission mappings - DTO<Array<ParsedCommissionEntityMapping>>
    // todo @Dhruv make sure this is paginated
    getCommissionMappings(): Promise<
        DTO<IParsedCommissionEntityMappingResponse[]>
    >;

    // get all commission mappings - DTO<Array<ParsedCommissionEntityMapping>>
    // todo @Dhruv make sure this is paginated
    filterCommissionMappings(
        commissionMappingsFilterOption: OrganizationCommissions,
    ): Promise<DTO<ParsedCommissionEntityMapping[]>>;

    //     - update commission mapping - DTO<ParsedCommissionEntityMapping>
    updateCommissionEntityStatus(
        id: number,
        status: COMMISSION_PAID_STATUS,
    ): Promise<DTO<ParsedCommissionEntityMapping>>;

    //     - create commission voucher - DTO<ParsedVoucher | null>
    addVoucherToEntity(
        entityId: number,
        entityType: COMMISSION_VOUCHER_ENTITIES,
        voucherData: Partial<ICommissionVoucher>,
    ): Promise<DTO<ParsedVoucher>>;

    /**
     * todo @Dhruv
     - get commission mapping by id - DTO<ParsedCommissionEntityMapping>
     - delete commission mapping - DTO<boolean>

     // todo @Dhruv make sure this is paginated
     - get all commission voucher - DTO<Array<ParsedVoucher>|null>
     - get commission voucher by id - DTO<ParsedVoucher|null>
     - update commission voucher - DTO<ParsedVoucher | null>
     - delete commission voucher - DTO<boolean>

     // todo @Dhruv make sure this is paginated
     - get all commission payout - DTO<Array<ParsedPayout>|null> paginated
     - get commission payout by id - DTO<ParsedPayout>
     - create commission payout - DTO<ParsedPayout>
     - update commission payout - DTO<ParsedPayout>
     */
}
