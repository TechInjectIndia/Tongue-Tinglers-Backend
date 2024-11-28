import { ICommission } from "../../../interfaces/commission";
import { APIResponse } from "../../common/models/ApiResponse";

export interface ICommissionRepo {
    create(commission: ICommission): Promise<APIResponse<ICommission>>;
    update(id: number, commission: ICommission): Promise<APIResponse<boolean>>;
    delete(ids: number[], deletedById: number): Promise<APIResponse<boolean>>;
    getAll(): Promise<APIResponse<ICommission[]>>;
    getById(id: number): Promise<APIResponse<ICommission>>;
    assignToCampaign(commissionId: number, campaignId: number): Promise<APIResponse<boolean>>;
    unassignFromCampaign(commissionId: number, campaignId: number): Promise<APIResponse<boolean>>;

}

