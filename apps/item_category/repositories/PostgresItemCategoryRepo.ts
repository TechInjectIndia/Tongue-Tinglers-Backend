import { APIResponse } from "apps/common/models/Base";
import { ItemCategoryTable } from "../database/ItemCategoryTable";
import { ICreateItemCategory } from "../models/IItemCategory";
import { ITEM_CATEGORY_STAUS } from "../models/ItemCategoryMisc";
import { IItemCategoryRepo } from "./IItemCategoryRepo";
import { Op, UniqueConstraintError } from "sequelize";
import { handleError, HelperMethods } from "apps/common/utils/HelperMethods";
import { PaginatedBaseResponse } from "interfaces";

export class PostgresItemCategoryRepo implements IItemCategoryRepo {

    async create(payload: ICreateItemCategory): Promise<APIResponse<ItemCategoryTable | null>> {
        try {
            const result = await ItemCategoryTable.create(payload);
            return HelperMethods.getSuccessResponse(result);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                return HelperMethods.getErrorResponse('Category already exists');
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async update(id: number, payload: ICreateItemCategory): Promise<APIResponse<null>> {
        try {
            await ItemCategoryTable.update(payload, {
                where: {
                    id: id
                }
            });
            return HelperMethods.getSuccessResponse(null);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                return HelperMethods.getErrorResponse('Category already exists');
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<ItemCategoryTable> | null>> {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await ItemCategoryTable.findAndCountAll({
                limit: pageSize,
                offset: offset,
                order: [['createdAt', 'DESC']],
                where: {
                    status: ITEM_CATEGORY_STAUS.ACTIVE
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

    async getById(id: number): Promise<APIResponse<ItemCategoryTable | null>> {
        try {
            const result = await ItemCategoryTable.findByPk(id);
            return HelperMethods.getSuccessResponse(result);
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async delete(ids: number[], deletedById: number): Promise<APIResponse<null>> {
        try {
            const transaction = await ItemCategoryTable.sequelize.transaction();
            await ItemCategoryTable.update({
                status: ITEM_CATEGORY_STAUS.DELETED,
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

    async search(text: string): Promise<APIResponse<ItemCategoryTable[] | null>> {
        try {
            const result = await ItemCategoryTable.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${text}%`
                    }
                },
                limit: 5,
            });
            return HelperMethods.getSuccessResponse(result);
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }
}