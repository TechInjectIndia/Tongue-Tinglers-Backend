import { APIResponse } from "apps/common/models/Base";
import { ItemUnitModel } from "../database/ItemUnitTable";
import { ICreateItemUnit, } from "../models/IItemUnit";
import { PaginatedBaseResponse } from "interfaces";

export interface IItemUnitRepo {
    create(payload: ICreateItemUnit): Promise<APIResponse<ItemUnitModel | null>>;

    update(id: number, payload: ICreateItemUnit): Promise<APIResponse<void>>;

    getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<ItemUnitModel> | null>>;

    getById(id: number): Promise<APIResponse<ItemUnitModel | null>>;

    delete(ids: number[], deletedById: number): Promise<APIResponse<null>>;
}