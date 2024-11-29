import { APIResponse } from "../../common/models/ApiResponse";
import { ICommissionRepo } from "./ICommissionRepo";
import { HelperMethods } from "../../common/utils/HelperMethods";
import { CommissionTable } from "../../../database/schema/commission/CommissionTable";
import { ICommission } from "../../../interfaces/commission";
import { sequelize } from "../../../config";
import { CommissionEntityMapTable } from "../../../database/schema/commission/CommissionAndEntityMappingTable";

export class PostgresCommissionRepo implements ICommissionRepo {

    async delete(ids: number[], deletedById: number): Promise<APIResponse<boolean>> {
        try {

            await CommissionTable.update(
                {
                    deletedBy: deletedById,
                    deletedAt: new Date(),
                }, {
                where: {
                    id: ids
                }
            });

            return HelperMethods.getSuccessResponse<boolean>(true);

        } catch (error) {
            HelperMethods.handleError(error);
            return HelperMethods.getErrorResponse(error.toString());
        }

    }

    async getAll(): Promise<APIResponse<ICommission[]>> {
        try {

            const result = await CommissionTable.findAll({
                order: [["updated_at", "DESC"]]
            });

            return HelperMethods.getSuccessResponse(result);

        } catch (error) {
            HelperMethods.handleError(error);
            return HelperMethods.getErrorResponse(error.toString());
        }
    }

    async getById(id: number): Promise<APIResponse<ICommission>> {
        try {

            const result = await CommissionTable.findByPk(id);

            return HelperMethods.getSuccessResponse(result);

        } catch (error) {
            HelperMethods.handleError(error);
            return HelperMethods.getErrorResponse(error.toString());
        }
    }

    async assignToCampaign(commissionId: number, campaignId: number): Promise<APIResponse<boolean>> {
        try {

            await CommissionEntityMapTable.create({

            });

            return HelperMethods.getSuccessResponse(true);

        } catch (error) {
            HelperMethods.handleError(error);
            return HelperMethods.getErrorResponse(error.toString());
        }
    }

    async unassignFromCampaign(commissionId: number, campaignId: number): Promise<APIResponse<boolean>> {
        throw new Error("Method not implemented.");
    }

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