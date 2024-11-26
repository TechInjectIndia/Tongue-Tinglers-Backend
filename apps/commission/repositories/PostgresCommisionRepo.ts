import { APIResponse } from "../../common/models/ApiResponse";
import { ICommisionRepo } from "./ICommisionRepo";
import { HelperMethods } from "../../common/utils/HelperMethods";
import { CommissionTable } from "../../../database/schema/commission/CommissionTable";

export class PostgresCommisionRepo implements ICommisionRepo {
    async create(commission: CommissionTable): Promise<APIResponse<CommissionTable>> {
        try {

            const saved = await CommissionTable.create(commission);
            return HelperMethods.getSuccessResponse<CommissionTable>(saved);

        } catch (error) {
            HelperMethods.handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async update(id: number, commission: CommissionTable): Promise<APIResponse<boolean>> {
        try {

            await CommissionTable.update(commission, {
                where: {
                    id: id
                }
            });

            return HelperMethods.getSuccessResponse<boolean>(true);

        } catch (error) {
            HelperMethods.handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }
}