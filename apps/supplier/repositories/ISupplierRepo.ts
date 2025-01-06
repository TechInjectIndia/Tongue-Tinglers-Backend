import { APIResponse } from "apps/common/models/Base";
import { SupplierTable } from "../database/SupplierTable";
import { ICreateSupplier, ISupplier } from "../models/ISupplier";
import { PaginatedBaseResponse } from "interfaces";

export interface ISupplierRepo {
    create(supplier: ICreateSupplier): Promise<APIResponse<SupplierTable | null>>;

    update(id: number, supplier: ICreateSupplier): Promise<APIResponse<void>>;

    getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<SupplierTable> | null>>;

    getById(id: number): Promise<APIResponse<SupplierTable | null>>;

    delete(ids: number[], deletedById: number): Promise<APIResponse<null>>;
   
    search(text:string): Promise<APIResponse<SupplierTable[] | null>>;

}