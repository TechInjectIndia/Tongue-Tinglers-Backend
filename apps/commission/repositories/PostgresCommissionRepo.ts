import { FranchiseModel } from "apps/franchise/models/FranchiseTable";
import {APIResponse} from "../../common/models/Base";
import { COMMISSION_PAID_STATUS, CommissionEntityMapTable, ICommissionEntityMapping, ICommissionEntityMappingResponse } from "../model/CommissionEntityMapTable";
import { CommissionTable } from "../model/CommmisionTable";
import {ICommissionRepo} from "./ICommissionRepo";
import { OrganizationModel } from "apps/organization/models/OrganizationTable";
import { handleError, HelperMethods } from "apps/common/utils/HelperMethods";
import { ICommission } from "../interface/Commission";
import { Op, UniqueConstraintError } from "sequelize";


export class PostgresCommissionRepo implements ICommissionRepo {

    async getMappingsData(): Promise<APIResponse<ICommissionEntityMappingResponse[]>> {
        try {
            const result = await CommissionEntityMapTable.findAll(
                {
                    include: [
                        {
                            model: CommissionTable,
                            attributes: ["id", "title"],

                        },
                        {
                            model: FranchiseModel,
                            attributes: ["id", "pocName"],
                            include: [{
                                model: OrganizationModel,
                                as: "organization",
                                attributes: ["id", "name"],
                            }]

                        },
                        {
                            model: OrganizationModel,
                            attributes: ["id", "name"],

                        },
                    ]
                }
            );

            const response: ICommissionEntityMappingResponse[] = [];

            /* TODO: Mandeep Singh(self), change this after the dependency is done */
            let franchiseAmount = 2000;
            let commissionAmount = 0;
            let appliedCommission = 10;
            for (const mapping of result) {
                response.push({
                    id: mapping.id,
                    franchiseId: mapping.franchiseId,
                    franchiseOrganization: {
                        id: mapping["FranchiseModel"]["organization"].id,
                        name: mapping["FranchiseModel"]["organization"].name,
                    },
                    commission: {
                        id: mapping.commissionId,
                        title: mapping["CommissionTable"].title,
                        type: mapping["CommissionTable"].type,
                        eventType: mapping["CommissionTable"].eventType,
                        value: mapping["CommissionTable"].value,
                    },
                    appliedCommission: {
                        franchiseAmount: franchiseAmount,
                        commissionAmount: appliedCommission,
                    },
                    organization: {
                        id: mapping.organizationId,
                        name: mapping["OrganizationModel"].name,
                    },
                    status: mapping.status,
                    createdBy: mapping.createdBy,
                    updatedBy: mapping.updatedBy,
                    deletedBy: mapping.deletedBy,
                    createdAt: mapping.createdAt,
                    updatedAt: mapping.updatedAt,
                    deletedAt: mapping.deletedAt,
                });
            }

            return HelperMethods.getSuccessResponse(response);

        }
        catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async search(searchText: string,
        type?: string): Promise<APIResponse<ICommission[]>> {

        try {

            const whereConditions: any = {};

            whereConditions.title = {
                [Op.iLike]: "%" + searchText.toLowerCase() + "%"
            };


            if (type) {
                whereConditions.eventType = type;
            }


            const result = await CommissionTable.findAll({
                where: whereConditions
            });

            return HelperMethods.getSuccessResponse(result);

        }
        catch (error) {
            handleError(error, searchText, type);
            return HelperMethods.getErrorResponse();
        }
    }

    async createMapEntities(mapEntities: ICommissionEntityMapping[], options?: { transaction?: any }): Promise<APIResponse<boolean>> {
        try {
            const { transaction } = options || {};
            await CommissionEntityMapTable.bulkCreate(mapEntities, {transaction});
            return HelperMethods.getSuccessResponse<boolean>(true);
        }
        catch (error) {
            handleError(error, mapEntities);
            return HelperMethods.getErrorResponse();
        }
    }

    async updateMapEntity(id: number,
        mapEntity: ICommissionEntityMapping): Promise<APIResponse<boolean>> {
        try {

            await CommissionEntityMapTable.update(mapEntity, {
                where: {
                    id: id
                }
            });

            return HelperMethods.getSuccessResponse<boolean>(true);

        }
        catch (error) {
            handleError(error, id, mapEntity);
            return HelperMethods.getErrorResponse();
        }
    }

    async delete(ids: number[],
        deletedById: number): Promise<APIResponse<boolean>> {
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

        }
        catch (error) {
            handleError(error, ids, deletedById);
            return HelperMethods.getErrorResponse(error.toString());
        }

    }

    async getAll(): Promise<APIResponse<ICommission[]>> {
        try {

            const result = await CommissionTable.findAll({
                order: [["updated_at", "DESC"]]
            });

            return HelperMethods.getSuccessResponse(result);

        }
        catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse(error.toString());
        }
    }

    async getById(id: number): Promise<APIResponse<CommissionTable>> {
        try {

            const result = await CommissionTable.findByPk(id);

            return HelperMethods.getSuccessResponse(result);

        }
        catch (error) {
            handleError(error, id);
            return HelperMethods.getErrorResponse(error.toString());
        }
    }

    async create(commission: CommissionTable): Promise<APIResponse<CommissionTable>> {
        try {

            const saved = await CommissionTable.create(commission);
            return HelperMethods.getSuccessResponse<CommissionTable>(saved);

        }
        catch (error) {
            handleError(error, commission);
            if (error instanceof UniqueConstraintError) {
                return HelperMethods.getErrorResponse('Title already exists');
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async update(id: number,
        commission: CommissionTable): Promise<APIResponse<boolean>> {
        try {

            await CommissionTable.update(commission, {
                where: {
                    id: id
                }
            });

            return HelperMethods.getSuccessResponse<boolean>(true);

        }
        catch (error) {
            handleError(error, id, commission);
            if (error instanceof UniqueConstraintError) {
                return HelperMethods.getErrorResponse('Title already exists');
            }
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
            return HelperMethods.getSuccessResponse<boolean>(true,
                'Title already exists');
        }
        catch (error) {
            handleError(error, title);
            return HelperMethods.getErrorResponse();
        }
    }

    async updateCommisionEntityStatus(id: number,
        status: COMMISSION_PAID_STATUS): Promise<APIResponse<boolean>> {
        try {

            await CommissionEntityMapTable.update({
                status: status
            }, {
                where: {
                    id: id
                }
            });

            return HelperMethods.getSuccessResponse<boolean>(true);

        }
        catch (error) {
            handleError(error, id, status);
            return HelperMethods.getErrorResponse();
        }
    }
}
