import { APIResponse, PaginatedBaseResponse } from "apps/common/models/Base";
import { SupplierTable } from "../database/SupplierTable";
import { ICreateSupplier, ISupplierRequest, ISupplierResponse, ISupplierUpdateRequest } from "../models/ISupplier";
import { SUPPLIER_STAUS } from "../models/SupplierMisc";
import { ISupplierRepo } from "./ISupplierRepo";
import { Op, UniqueConstraintError } from "sequelize";
import { sequelize } from "config/database";
import { handleError, HelperMethods } from "apps/common/utils/HelperMethods";
import { AddressModel } from "apps/address/models/AddressTable";

export class PostgresSupplierRepo implements ISupplierRepo {

    async create(supplier: ISupplierRequest): Promise<APIResponse<SupplierTable | null>> {
        try {
            const transaction = await sequelize.transaction();
            /* save address */
            const address = await AddressModel.create({
                ...supplier.address,
                // createdBy: supplier.createdBy,
                firstName: "",
                lastName: "",
            }, {
                transaction: transaction,
            });

            const payload: ICreateSupplier = {
                name: supplier.name,
                email: supplier.email,
                phone: supplier.phone,
                addressId: address.dataValues.id,
                gst: supplier.gst,
                pan: supplier.pan,
                status: SUPPLIER_STAUS.ACTIVE,
                createdBy: supplier.createdBy,
            };


            const result = await SupplierTable.create(payload, {
                transaction: transaction,
            });

            transaction.commit();

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
                else if (error.errors[0].path === 'gst') {
                    return HelperMethods.getErrorResponse('GST number already exists');
                }
                else if (error.errors[0].path === 'pan') {
                    return HelperMethods.getErrorResponse('PAN number already exists');
                }
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async update(id: number, supplier: ISupplierUpdateRequest): Promise<APIResponse<null>> {
        try {


            const transaction = await sequelize.transaction();


            await SupplierTable.update(supplier, {
                where: {
                    id: id
                },
                transaction: transaction,
            });


            await AddressModel.update(supplier.address, {
                where: {
                    id: supplier.addressId
                },
                transaction: transaction,
            });


            await transaction.commit();

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
                else if (error.errors[0].path === 'gst') {
                    return HelperMethods.getErrorResponse('GST number already exists');
                }
                else if (error.errors[0].path === 'pan') {
                    return HelperMethods.getErrorResponse('PAN number already exists');
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

    async getById(id: number): Promise<APIResponse<ISupplierResponse | null>> {
        try {
            const result = await SupplierTable.findByPk(id, {
                include: {
                    model: AddressModel,
                    as: "address",
                },
            });
            if (result) {
                return HelperMethods.getSuccessResponse({
                    ...result.get(),
                    address: result.address.get(),
                });
            }
            else {
                return HelperMethods.getErrorResponse("No record found");
            }
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