import { CommissionEntityMapTable, ICommissionEntityMapping } from "../../../database/schema/commission/CommissionAndEntityMappingTable";
import { CommissionTable } from "../../../database/schema/commission/CommissionTable";
import { APIResponse } from "../../common/models/ApiResponse";
import { NextFunction, Request, Response } from "express";


export interface ICommissionController {
    create(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable>>;

    update(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable>>;

    getById(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable>>;

    delete(req: Request, res: Response, next: NextFunction): Promise<APIResponse<boolean>>;

    getAll(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable[]>>;

    createMapEntry(req: Request, res: Response, next: NextFunction): Promise<APIResponse<null>>;

    updateMapEntry(req: Request, res: Response, next: NextFunction): Promise<APIResponse<null>>;

    searchCommission(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable[]>>;

    getMappingsData(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionEntityMapTable[]>>;

}