import { APIResponse } from "apps/common/models/Base";
import { IReceiveRawMaterialStock, IRawMaterialStockDetails, IRawMaterialStockInDetails } from "../models/IRawMaterialStock";
import { PaginatedBaseResponse } from "interfaces";

export interface IRawMaterialStockRepo {

    receiveStock(payload: IReceiveRawMaterialStock): Promise<APIResponse<null>>;

    getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IRawMaterialStockDetails> | null>>;

    getById(id: number): Promise<APIResponse<IRawMaterialStockDetails | null>>;

    getStockIn(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IRawMaterialStockInDetails> | null>>;

}