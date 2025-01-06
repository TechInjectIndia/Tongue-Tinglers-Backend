import { APIResponse } from "apps/common/models/Base";
import { ItemUnitTable } from "../database/ItemUnitTable";
import { ICreateItemUnit, } from "../models/IItemUnit";
import { PaginatedBaseResponse } from "interfaces";

export interface IItemUnitRepo {
    create(payload: ICreateItemUnit): Promise<APIResponse<ItemUnitTable | null>>;

    update(id: number, payload: ICreateItemUnit): Promise<APIResponse<void>>;

    getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<ItemUnitTable> | null>>;

    getById(id: number): Promise<APIResponse<ItemUnitTable | null>>;

    delete(ids: number[], deletedById: number): Promise<APIResponse<null>>;
}