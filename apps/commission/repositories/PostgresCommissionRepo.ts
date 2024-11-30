import { APIResponse } from "../../common/models/ApiResponse";
import { ICommissionRepo } from "./ICommissionRepo";
import { HelperMethods } from "../../common/utils/HelperMethods";
import { CommissionTable } from "../../../database/schema/commission/CommissionTable";
import { ICommission } from "../../../interfaces/commission";
import { CommissionEntityMapTable, ICommissionEntityMapping } from "../../../database/schema/commission/CommissionAndEntityMappingTable";
import { Op } from "sequelize";

export class PostgresCommissionRepo implements ICommissionRepo {
    async search(searchText: string): Promise<APIResponse<ICommission[]>> {

        try {

            const result = await CommissionTable.findAll({
                where: {
                    title: {

                        [Op.iLike]: "%" + searchText.toLowerCase() + "%"
                    }
                }
            });

            return HelperMethods.getSuccessResponse(result);

        } catch (error) {
            HelperMethods.handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async createMapEntities(mapEntities: ICommissionEntityMapping[]): Promise<APIResponse<boolean>> {
        try {

            await CommissionEntityMapTable.bulkCreate(mapEntities);
            return HelperMethods.getSuccessResponse<boolean>(true);

        } catch (error) {
            HelperMethods.handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }
    async updateMapEntity(id: number, mapEntity: ICommissionEntityMapping): Promise<APIResponse<boolean>> {
        try {

            await CommissionEntityMapTable.update(mapEntity, {
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

    async getById(id: number): Promise<APIResponse<CommissionTable>> {
        try {

            const result = await CommissionTable.findByPk(id);

            return HelperMethods.getSuccessResponse(result);

        } catch (error) {
            HelperMethods.handleError(error);
            return HelperMethods.getErrorResponse(error.toString());
        }
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


    async isTitleAlreadyExists(title: string): Promise<APIResponse<boolean>> {
        try {

            const result = await CommissionTable.count({
                where: {
                    title: {

                        [Op.iLike]: title.toLowerCase()
                    }
                }
            });
            if (result === 0) {

                return HelperMethods.getSuccessResponse<boolean>(false);
            }
            return HelperMethods.getSuccessResponse<boolean>(true, 'Title already exists');

        } catch (error) {
            HelperMethods.handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }
}