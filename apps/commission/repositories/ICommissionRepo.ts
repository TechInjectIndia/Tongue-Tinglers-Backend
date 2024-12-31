import { APIResponse } from "apps/common/models/Base";
import { ICommission } from "../interface/Commission";
import { COMMISSION_PAID_STATUS, CommissionEntityMapTable, ICommissionEntityMapping, ICommissionEntityMappingResponse } from "../model/CommissionEntityMapTable";


export interface ICommissionRepo {
    create(commission: ICommission): Promise<APIResponse<ICommission>>;

    update(id: number, commission: ICommission): Promise<APIResponse<boolean>>;

    delete(ids: number[], deletedById: number): Promise<APIResponse<boolean>>;

    getAll(): Promise<APIResponse<ICommission[]>>;

    getById(id: number): Promise<APIResponse<ICommission>>;

    createMapEntities(mapEntities: ICommissionEntityMapping[], options?: { transaction?: any }): Promise<APIResponse<boolean>>;

    updateMapEntity(id: number, mapEntity: ICommissionEntityMapping): Promise<APIResponse<boolean>>;

    isTitleAlreadyExists(title: string): Promise<APIResponse<boolean>>;

    search(searchText: string, type?: string): Promise<APIResponse<ICommission[]>>;

    getMappingsData(): Promise<APIResponse<ICommissionEntityMappingResponse[]>>;

    updateCommisionEntityStatus(id: number, status: COMMISSION_PAID_STATUS): Promise<APIResponse<boolean>>;
}

