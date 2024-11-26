import { ICommission } from "../../../interfaces/commission";
import { APIResponse } from "../../common/models/ApiResponse";

export interface ICommissionRepo {
    create(commission: ICommission): Promise<APIResponse<ICommission>>;
    update(id: number, commission: ICommission): Promise<APIResponse<boolean>>;
}

