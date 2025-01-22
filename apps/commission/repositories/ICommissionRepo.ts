import {
    ICommission,
    ParsedCommission,
    ParsedCommissionEntityMapping
} from "../interface/Commission";
import {
    COMMISSION_PAID_STATUS,
    ICommissionEntityMapping,
    CommissionVoucherCreationAttributes,
    COMMISSION_VOUCHER_ENTITIES
} from "../model/CommissionEntityMappingTable";
import { ICommissionVoucher } from "../model/CommissionVoucherTable";
import {DTO} from "apps/common/models/DTO";


export interface ICommissionRepo {
    //     - create commission - DTO<ParsedCommission|null>
    create(commission: ICommission): Promise<DTO<ParsedCommission>>;

    //     - update commission - DTO<ParsedCommission>
    update(commission: ICommission): Promise<DTO<ParsedCommission>>;

    //     - delete commission - DTO<boolean>
    delete(ids: number[], deletedById: number): Promise<DTO<boolean>>;

    //     - get all commissions - DTO<Array<ParsedCommission>|null>
    getAll(): Promise<DTO<Array<ParsedCommission>>>;  // todo @Dhruv make sure this is paginated

    //     - get commission by id - DTO<ParsedCommission|null>
    getById(id: number): Promise<DTO<ParsedCommission>>;

    createMapEntities(mapEntities: CommissionVoucherCreationAttributes[], options?: { transaction?: any }): Promise<DTO<boolean>>;

    updateMapEntity(id: number, mapEntity: ICommissionEntityMapping): Promise<DTO<boolean>>;

    isTitleAlreadyExists(title: string): Promise<DTO<boolean>>;

    search(searchText: string, type?: string): Promise<DTO<ICommission[]>>;

    // get all commission mappings - DTO<Array<ParsedCommissionEntity> | null>
    getCommissionMappings(): Promise<DTO<ParsedCommissionEntityMapping[]>>;


    updateCommissionEntityStatus(id: number, status: COMMISSION_PAID_STATUS): Promise<DTO<boolean>>;

    addVoucherToEntity(entityId: number, entityType: COMMISSION_VOUCHER_ENTITIES, voucherData: Partial<ICommissionVoucher>)







//     -
//     - get commission mapping by id - DTO<ParsedCommissionEntity | null>
//     - create commission mapping - DTO<ParsedCommissionEntity | null>
//     - update commission mapping - DTO<ParsedCommissionEntity | null>
//     - delete commission mapping - DTO<boolean>
//     - get all commission voucher - DTO<Array<ParsedVoucher>|null>
//     - get commission voucher by id - DTO<ParsedVoucher|null>
//     - create commission voucher - DTO<ParsedVoucher | null>
//     - update commission voucher - DTO<ParsedVoucher | null>
//     - delete commission voucher - DTO<boolean>
//     - get all commission payout - DTO<Array<ParsedPayout>|null>
//     - get commission payout by id - DTO<ParsedPayout|null>
//     - create commission payout - DTO<ParsedPayout|null>
//     - update commission payout - DTO<ParsedPayout|null>
//     - delete commission payout - DTO<boolean>



}

