import { APIResponse, PaginatedBaseResponse } from "apps/common/models/Base";
import { SupplierTable } from "../database/SupplierTable";
import { ISupplierRequest, ISupplierResponse, ISupplierUpdateRequest } from "../models/ISupplier";

export interface ISupplierRepo {
    create(supplier: ISupplierRequest): Promise<APIResponse<SupplierTable | null>>;

    update(id: number, supplier: ISupplierUpdateRequest): Promise<APIResponse<void>>;

    getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<SupplierTable> | null>>;

    getById(id: number): Promise<APIResponse<ISupplierResponse | null>>;

    delete(ids: number[], deletedById: number): Promise<APIResponse<null>>;

    search(text: string): Promise<APIResponse<SupplierTable[] | null>>;

}