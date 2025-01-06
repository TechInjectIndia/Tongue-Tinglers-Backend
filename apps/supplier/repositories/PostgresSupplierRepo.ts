import { handleError, HelperMethods } from "apps/common/utils/HelperMethods";
import { SupplierTable } from "../database/SupplierTable";
import { ICreateSupplier, ISupplier } from "../models/ISupplier";
import { SUPPLIER_STAUS } from "../models/SupplierMisc";
import { ISupplierRepo } from "./ISupplierRepo";
import { Op, UniqueConstraintError } from "sequelize";
import { APIResponse } from "apps/common/models/Base";
import { PaginatedBaseResponse } from "interfaces";
import { sequelize } from "config";

export class PostgresSupplierRepo implements ISupplierRepo {

    async create(supplier: ICreateSupplier): Promise<APIResponse<SupplierTable | null>> {
        try {
            const result = await SupplierTable.create(supplier);
            return HelperMethods.getSuccessResponse(result);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                if (error.errors[0].path === 'email') {
                    return HelperMethods.getErrorResponse('Email already exists');
                }
                else if (error.errors[0].path === 'phone') {
                    return HelperMethods.getErrorResponse('Contact number already exists');
                }
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async update(id: number, supplier: ICreateSupplier): Promise<APIResponse<null>> {
        try {
            await SupplierTable.update(supplier, {
                where: {
                    id: id
                }
            });
            return HelperMethods.getSuccessResponse(null);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                if (error.errors[0].path === 'email') {
                    return HelperMethods.getErrorResponse('Email already exists');
                }
                else if (error.errors[0].path === 'phone') {
                    return HelperMethods.getErrorResponse('Contact number already exists');
                }
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<SupplierTable> | null>> {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await SupplierTable.findAndCountAll({
                limit: pageSize,
                offset: offset,
                order: [['createdAt', 'DESC']],
                where: {
                    status: SUPPLIER_STAUS.ACTIVE
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

    async getById(id: number): Promise<APIResponse<SupplierTable | null>> {
        try {
            const result = await SupplierTable.findByPk(id);
            return HelperMethods.getSuccessResponse(result);
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async delete(ids: number[], deletedById: number): Promise<APIResponse<null>> {
        try {
            const transaction = await sequelize.transaction();
            await SupplierTable.update({
                status: SUPPLIER_STAUS.DELETED,
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

    async search(text: string): Promise<APIResponse<SupplierTable[] | null>> {
        try {
            const result = await SupplierTable.findAll({
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