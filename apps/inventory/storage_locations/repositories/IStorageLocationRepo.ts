import { APIResponse, PaginatedBaseResponse } from "apps/common/models/Base";
import { StorageLocationTable } from "../database/StorageLocationTable";
import { ICreateStorageLocation } from "../models/IStorageLocation";

export interface IStorageLocationRepo {
    create(vendor: ICreateStorageLocation): Promise<APIResponse<StorageLocationTable | null>>;

    update(id: number, Vendor: ICreateStorageLocation): Promise<APIResponse<void>>;

    getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<StorageLocationTable> | null>>;

    getById(id: number): Promise<APIResponse<StorageLocationTable | null>>;

    delete(ids: number[], deletedById: number): Promise<APIResponse<null>>;
}