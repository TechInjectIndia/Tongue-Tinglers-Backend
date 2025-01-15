import { APIResponse, PaginatedBaseResponse } from "apps/common/models/Base";
import { RawMaterialTable } from "../database/RawMaterialTable";
import { ICreateRawMaterial, IRawMaterialDetails, ISingleRawMaterialDetails } from "../models/IRawMaterial";

export interface IRawMaterialRepo {
    create(payload: ICreateRawMaterial): Promise<APIResponse<RawMaterialTable | null>>;

    update(id: number, payload: ICreateRawMaterial): Promise<APIResponse<void>>;

    getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IRawMaterialDetails> | null>>;

    getById(id: number): Promise<APIResponse<IRawMaterialDetails | null>>;

    delete(ids: number[], deletedById: number): Promise<APIResponse<null>>;

    search(text: string, supplierId?: number): Promise<APIResponse<ISingleRawMaterialDetails[] | null>>;

}