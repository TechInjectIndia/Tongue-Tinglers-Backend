import { handleError, HelperMethods } from "apps/common/utils/HelperMethods";
import { ItemUnitTable } from "../database/ItemUnitTable";
import { ICreateItemUnit } from "../models/IItemUnit";
import { ITEM_UNIT_STAUS } from "../models/ItemUnitMisc";
import { IItemUnitRepo } from "./IItemUnitRepo";
import { Op, UniqueConstraintError } from "sequelize";
import { APIResponse, PaginatedBaseResponse } from "apps/common/models/Base";
import { sequelize } from "config/database";

export class PostgresItemUnitRepo implements IItemUnitRepo {

    async create(payload: ICreateItemUnit): Promise<APIResponse<ItemUnitTable | null>> {
        try {
            const result = await ItemUnitTable.create(payload);
            return HelperMethods.getSuccessResponse(result);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                return HelperMethods.getErrorResponse('Unit already exists');
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async update(id: number, payload: ICreateItemUnit): Promise<APIResponse<null>> {
        try {
            await ItemUnitTable.update(payload, {
                where: {
                    id: id
                }
            });
            return HelperMethods.getSuccessResponse(null);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                return HelperMethods.getErrorResponse('Unit already exists');
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<ItemUnitTable> | null>> {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await ItemUnitTable.findAndCountAll({
                limit: pageSize,
                offset: offset,
                order: [['createdAt', 'DESC']],
                where: {
                    status: ITEM_UNIT_STAUS.ACTIVE
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

    async getById(id: number): Promise<APIResponse<ItemUnitTable | null>> {
        try {
            const result = await ItemUnitTable.findByPk(id);
            return HelperMethods.getSuccessResponse(result);
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async delete(ids: number[], deletedById: number): Promise<APIResponse<null>> {
        try {
            const transaction = await sequelize.transaction();
            await ItemUnitTable.update({
                status: ITEM_UNIT_STAUS.DELETED,
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