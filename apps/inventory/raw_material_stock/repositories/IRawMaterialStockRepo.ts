import { APIResponse, PaginatedBaseResponse } from "apps/common/models/Base";
import { ICreateRawMaterialStock, IRawMaterialStock, IReceiveRawMaterialStock, IRawMaterialStockDetails, IRawMaterialStockInDetails } from "../models/IRawMaterialStock";

export interface IRawMaterialStockRepo {

    receiveStock(payload: IReceiveRawMaterialStock): Promise<APIResponse<null>>;

    getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IRawMaterialStockDetails> | null>>;

    // getById(id: number): Promise<APIResponse<IRawMaterialStockDetails | null>>;

    getStockIn(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IRawMaterialStockInDetails> | null>>;

}