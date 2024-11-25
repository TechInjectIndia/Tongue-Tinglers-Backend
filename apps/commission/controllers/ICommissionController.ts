import { CommissionTable } from "../../../database/schema/commission/CommissionTable";
import { ICommission } from "../../../interfaces/commission";
import { APIResponse } from "../../common/models/ApiResponse";

export interface ICommissionController {
    create(input: ICommission): Promise<APIResponse<CommissionTable>>;
}