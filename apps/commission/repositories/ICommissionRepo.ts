import { APIResponse } from "apps/common/models/Base";
import { ICommission } from "../interface/Commission";
import {
    COMMISSION_PAID_STATUS,
    CommissionEntityMappingModel,
    ICommissionEntityMapping,
    ICommissionEntityMappingResponse,
    CommissionVoucherCreationAttributes
} from "../model/CommissionEntityMappingTable";


export interface ICommissionRepo {
    create(commission: ICommission): Promise<APIResponse<ICommission>>;

    update(id: number, commission: ICommission): Promise<APIResponse<boolean>>;

    delete(ids: number[], deletedById: number): Promise<APIResponse<boolean>>;

    getAll(): Promise<APIResponse<ICommission[]>>;

    getById(id: number): Promise<APIResponse<ICommission>>;

    createMapEntities(mapEntities: CommissionVoucherCreationAttributes[], options?: { transaction?: any }): Promise<APIResponse<boolean>>;

    updateMapEntity(id: number, mapEntity: ICommissionEntityMapping): Promise<APIResponse<boolean>>;

    isTitleAlreadyExists(title: string): Promise<APIResponse<boolean>>;

    search(searchText: string, type?: string): Promise<APIResponse<ICommission[]>>;

    getMappingsData(): Promise<APIResponse<ICommissionEntityMappingResponse[]>>;

    updateCommissionEntityStatus(id: number, status: COMMISSION_PAID_STATUS): Promise<APIResponse<boolean>>;
}

