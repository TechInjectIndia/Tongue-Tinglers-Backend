import { APIResponse } from "apps/common/models/Base";
import { FactoryGateTable } from "../database/FactoryGateTable";
import { ICreateFactoryGate } from "../models/IFactoryGate";
import { PaginatedBaseResponse } from "interfaces";

export interface IFactoryGateRepo {
    create(vendor: ICreateFactoryGate): Promise<APIResponse<FactoryGateTable | null>>;

    update(id: number, Vendor: ICreateFactoryGate): Promise<APIResponse<void>>;

    getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<FactoryGateTable> | null>>;

    getById(id: number): Promise<APIResponse<FactoryGateTable | null>>;

    delete(ids: number[], deletedById: number): Promise<APIResponse<null>>;
}