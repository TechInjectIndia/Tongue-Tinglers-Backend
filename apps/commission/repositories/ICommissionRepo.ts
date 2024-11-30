import { ICommissionEntityMapping } from "../../../database/schema/commission/CommissionAndEntityMappingTable";
import { ICommission } from "../../../interfaces/commission";
import { APIResponse } from "../../common/models/ApiResponse";

export interface ICommissionRepo {
    create(commission: ICommission): Promise<APIResponse<ICommission>>;
    update(id: number, commission: ICommission): Promise<APIResponse<boolean>>;
    delete(ids: number[], deletedById: number): Promise<APIResponse<boolean>>;
    getAll(): Promise<APIResponse<ICommission[]>>;
    getById(id: number): Promise<APIResponse<ICommission>>;


    createMapEntities(mapEntities: ICommissionEntityMapping[]): Promise<APIResponse<boolean>>;
    updateMapEntity(id: number, mapEntity: ICommissionEntityMapping): Promise<APIResponse<boolean>>;


    isTitleAlreadyExists(title: string): Promise<APIResponse<boolean>>;

    search(searchText: string): Promise<APIResponse<ICommission[]>>;
}

