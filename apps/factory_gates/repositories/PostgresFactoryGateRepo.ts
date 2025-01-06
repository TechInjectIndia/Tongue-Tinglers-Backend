import { FactoryGateTable } from "../database/FactoryGateTable";
import { ICreateFactoryGate } from "../models/IFactoryGate";
import { FACTORY_GATE_STAUS } from "../models/FactoryGateMisc";
import { IFactoryGateRepo } from "./IFactoryGateRepo";
import { Op, UniqueConstraintError } from "sequelize";
import { APIResponse } from "apps/common/models/Base";
import { handleError, HelperMethods } from "apps/common/utils/HelperMethods";
import { PaginatedBaseResponse } from "interfaces";
import { sequelize } from "config";

export class PostgresFactoryGateRepo implements IFactoryGateRepo {

    async create(vendor: ICreateFactoryGate): Promise<APIResponse<FactoryGateTable | null>> {
        try {
            const result = await FactoryGateTable.create(vendor);
            return HelperMethods.getSuccessResponse(result);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                return HelperMethods.getErrorResponse('Name already exists');
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async update(id: number, vendor: ICreateFactoryGate): Promise<APIResponse<null>> {
        try {
            await FactoryGateTable.update(vendor, {
                where: {
                    id: id
                }
            });
            return HelperMethods.getSuccessResponse(null);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                return HelperMethods.getErrorResponse('Name already exists');

            }
            return HelperMethods.getErrorResponse();
        }
    }

    async getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<FactoryGateTable> | null>> {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await FactoryGateTable.findAndCountAll({
                limit: pageSize,
                offset: offset,
                order: [['createdAt', 'DESC']],
                where: {
                    status: FACTORY_GATE_STAUS.ACTIVE
                },
            });

            const totalPages = Math.ceil(count / pageSize);

            return HelperMethods.getSuccessResponse({
                currentPage: page,
                totalData: count,
                totalPages: totalPages,
                data: rows,
            });
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async getById(id: number): Promise<APIResponse<FactoryGateTable | null>> {
        try {
            const result = await FactoryGateTable.findByPk(id);
            return HelperMethods.getSuccessResponse(result);
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async delete(ids: number[], deletedById: number): Promise<APIResponse<null>> {
        try {
            const transaction = await sequelize.transaction();
            await FactoryGateTable.update({
                status: FACTORY_GATE_STAUS.DELETED,
                deletedBy: deletedById,
            }, {
                where: {
                    id: {
                        [Op.in]: ids
                    }
                },
                transaction: transaction
            });
            return HelperMethods.getSuccessResponse(null);
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }
}