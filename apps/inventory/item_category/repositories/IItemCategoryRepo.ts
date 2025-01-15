import { APIResponse, PaginatedBaseResponse } from "apps/common/models/Base";
import { ItemCategoryTable } from "../database/ItemCategoryTable";
import { ICreateItemCategory, } from "../models/IItemCategory";

export interface IItemCategoryRepo {
    create(payload: ICreateItemCategory): Promise<APIResponse<ItemCategoryTable | null>>;

    update(id: number, payload: ICreateItemCategory): Promise<APIResponse<void>>;

    getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<ItemCategoryTable> | null>>;

    getById(id: number): Promise<APIResponse<ItemCategoryTable | null>>;

    delete(ids: number[], deletedById: number): Promise<APIResponse<null>>;

    search(text: string): Promise<APIResponse<ItemCategoryTable[] | null>>
}