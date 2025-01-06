import { APIResponse } from "apps/common/models/Base";
import { StorageLocationTable } from "../database/StorageLocationTable";
import { ICreateStorageLocation, } from "../models/IStorageLocation";
import { STORAGE_LOCATION_STAUS } from "../models/StorageLocationMisc";
import { IStorageLocationRepo } from "./IStorageLocationRepo";
import { Op, UniqueConstraintError } from "sequelize";
import { handleError, HelperMethods } from "apps/common/utils/HelperMethods";
import { PaginatedBaseResponse } from "interfaces";
import { sequelize } from "config";

export class PostgresStorageLocationRepo implements IStorageLocationRepo {

    async create(vendor: ICreateStorageLocation): Promise<APIResponse<StorageLocationTable | null>> {
        try {
            const result = await StorageLocationTable.create(vendor);
            return HelperMethods.getSuccessResponse(result);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                return HelperMethods.getErrorResponse('Name already exists');
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async update(id: number, vendor: ICreateStorageLocation): Promise<APIResponse<null>> {
        try {
            await StorageLocationTable.update(vendor, {
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

    async getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<StorageLocationTable> | null>> {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await StorageLocationTable.findAndCountAll({
                limit: pageSize,
                offset: offset,
                order: [['createdAt', 'DESC']],
                where: {
                    status: STORAGE_LOCATION_STAUS.ACTIVE
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

    async getById(id: number): Promise<APIResponse<StorageLocationTable | null>> {
        try {
            const result = await StorageLocationTable.findByPk(id);
            return HelperMethods.getSuccessResponse(result);
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async delete(ids: number[], deletedById: number): Promise<APIResponse<null>> {
        try {
            const transaction = await sequelize.transaction();
            await StorageLocationTable.update({
                status: STORAGE_LOCATION_STAUS.DELETED,
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