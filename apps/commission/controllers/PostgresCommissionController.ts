import { CommissionTable } from "../../../database/schema/commission/CommissionTable";
import { ICommission } from "../../../interfaces/commission";
import { APIResponse } from "../../common/models/ApiResponse";
import { ICommissionController } from "./ICommissionController";

export class PostgresCommisionController implements ICommissionController {
    create(input: ICommission): Promise<APIResponse<CommissionTable>> {
    
    }
}