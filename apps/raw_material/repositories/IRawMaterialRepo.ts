import { APIResponse } from "apps/common/models/Base";
import { RawMaterialModal } from "../database/RawMaterialTable";
import { ICreateRawMaterial, IRawMaterialDetails } from "../models/IRawMaterial";
import { PaginatedBaseResponse } from "interfaces";

export interface IRawMaterialRepo {
    create(payload: ICreateRawMaterial): Promise<APIResponse<RawMaterialModal | null>>;

    update(id: number, payload: ICreateRawMaterial): Promise<APIResponse<void>>;

    getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IRawMaterialDetails> | null>>;

    getById(id: number): Promise<APIResponse<IRawMaterialDetails | null>>;

    delete(ids: number[], deletedById: number): Promise<APIResponse<null>>;
}