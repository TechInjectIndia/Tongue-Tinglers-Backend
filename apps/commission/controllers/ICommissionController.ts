import { CommissionTable } from "../../../database/schema/commission/CommissionTable";
import { ICommission } from "../../../interfaces/commission";
import { APIResponse } from "../../common/models/ApiResponse";
import { NextFunction, Request, Response } from "express";


export interface ICommissionController {
    create(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable>>;
    update(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable>>;
}