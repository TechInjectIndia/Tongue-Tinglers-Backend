import { ItemCategoryTable } from "../../item_category/database/ItemCategoryTable";
import { ItemUnitModel } from "../../item_unit/database/ItemUnitTable";
import { RawMaterialModal } from "../database/RawMaterialTable";
import { ICreateRawMaterial, ICreateRawMaterialPrice, IRawMaterial, IRawMaterialDetails, IRawMaterialPriceDetails } from "../models/IRawMaterial";
import { RAW_MATERIAL_STAUS } from "../models/RawMaterialMisc";
import { IRawMaterialRepo } from "./IRawMaterialRepo";
import { Op, UniqueConstraintError } from "sequelize";
import { RawMaterialPriceTable } from "../database/RawMaterialPriceTable";
import { SupplierTable } from "../../supplier/database/SupplierTable";
import { APIResponse } from "apps/common/models/Base";
import { sequelize } from "config";
import { handleError, HelperMethods } from "apps/common/utils/HelperMethods";
import { PaginatedBaseResponse } from "interfaces";
import { RawMaterialStockTable } from "apps/raw_material_stock/database/RawMaterialStockTable";

export class PostgresRawMaterialRepo implements IRawMaterialRepo {

    async create(payload: ICreateRawMaterial,): Promise<APIResponse<RawMaterialModal | null>> {
        try {

            const transaction = await sequelize.transaction();

            const savedRawMaterial = await RawMaterialModal.create(payload, {
                transaction: transaction,
            });

            const stockPayload: any = {
                rawMaterialId: savedRawMaterial.getDataValue('id'),
                totalStock: 0,
                assignedStock: 0,
            };
            stockPayload.createdBy = payload.createdBy;

            /* create raw material stock */
            await RawMaterialStockTable.create(stockPayload, {
                transaction: transaction,
            });
            /* create raw material price */

            const pricePayload: ICreateRawMaterialPrice[] = [];


            for (const data of payload.priceData) {
                pricePayload.push({
                    price: data.price,
                    moq: data.moq,
                    supplierId: data.supplierId,
                    rawMaterialId: savedRawMaterial.getDataValue('id'),
                    createdBy: payload.createdBy,
                });
            }


            await RawMaterialPriceTable.bulkCreate(pricePayload, {
                transaction: transaction,
            });


            await transaction.commit();

            return HelperMethods.getSuccessResponse(savedRawMaterial);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                if (error.errors[0].path === 'name') {
                    return HelperMethods.getErrorResponse('Name already exists');
                }
                else if (error.errors[0].path === 'sku') {
                    return HelperMethods.getErrorResponse('SKU already exists');
                }
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async update(id: number, payload: ICreateRawMaterial): Promise<APIResponse<null>> {
        try {


            /* TODO: get user id */
            const createdById: number = 1;

            const transaction = await sequelize.transaction();

            await RawMaterialModal.update(payload, {
                where: {
                    id: id
                },
                transaction: transaction
            });

            /* delete old data */
            await RawMaterialPriceTable.destroy({
                where: {
                    rawMaterialId: id
                },
                transaction: transaction
            });

            /* create raw material price */

            const pricePayload: ICreateRawMaterialPrice[] = [];


            for (const data of payload.priceData) {
                pricePayload.push({
                    price: data.price,
                    moq: data.moq,
                    supplierId: data.supplierId,
                    rawMaterialId: id,
                    createdBy: createdById,
                });
            }


            await RawMaterialPriceTable.bulkCreate(pricePayload, {
                transaction: transaction,
            });


            await transaction.commit();

            return HelperMethods.getSuccessResponse(null);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                if (error.errors[0].path === 'name') {
                    return HelperMethods.getErrorResponse('Name already exists');
                }
                else if (error.errors[0].path === 'sku') {
                    return HelperMethods.getErrorResponse('SKU already exists');
                }
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IRawMaterialDetails> | null>> {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await RawMaterialModal.findAndCountAll({
                limit: pageSize,
                offset: offset,
                order: [['createdAt', 'DESC']],
                where: {
                    status: RAW_MATERIAL_STAUS.ACTIVE
                },
                include: [
                    {
                        model: ItemUnitModel,
                        attributes: ['name'],
                    },
                    {
                        model: ItemCategoryTable,
                        attributes: ['name']
                    },
                    {
                        model: RawMaterialPriceTable,
                        include: [
                            {
                                model: SupplierTable,
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            });

            const totalPages = Math.ceil(count / pageSize);

            const data: IRawMaterialDetails[] = [];
            const priceData: IRawMaterialPriceDetails[] = [];


            for (const item of rows) {


                // @ts-ignore
                for (const data of item.RawMaterialPriceTables) {
                    priceData.push({
                        price: data.getDataValue('price'),
                        moq: data.getDataValue('moq'),
                        supplierId: data.getDataValue('supplierId'),
                        supplier: data.SupplierTable.getDataValue('name'),
                        rawMaterialId: item.getDataValue('id'),
                        rawMaterial: item.getDataValue('name'),
                    });
                }


                data.push({
                    id: item.getDataValue('id'),
                    name: item.getDataValue('name'),
                    unitId: item.getDataValue('unitId'),
                    categoryId: item.getDataValue('categoryId'),
                    sku: item.getDataValue('sku'),
                    msq: item.getDataValue('msq'),
                    status: item.getDataValue('status'),
                    //@ts-ignore
                    unitName: item.ItemUnitModel.getDataValue('name'),
                    //@ts-ignore
                    categoryName: item.ItemCategoryTable.getDataValue('name'),


                    priceData: priceData,

                    createdAt: item.getDataValue('createdAt'),
                    updatedAt: item.getDataValue('updatedAt'),
                    createdBy: item.getDataValue('createdBy'),
                    updatedBy: item.getDataValue('updatedBy'),
                    deletedBy: item.getDataValue('deletedBy'),
                    deletedAt: item.getDataValue('deletedAt'),
                });
            }

            return HelperMethods.getSuccessResponse({
                currentPage: page,
                totalData: count,
                totalPages: totalPages,
                data: data,
            });
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async getById(id: number): Promise<APIResponse<IRawMaterialDetails | null>> {
        try {
            const result = await RawMaterialModal.findByPk(id, {
                include: [
                    {
                        model: RawMaterialPriceTable,
                        include: [
                            {
                                model: SupplierTable,
                                attributes: ['name']
                            }
                        ]
                    },
                    {
                        model: ItemUnitModel,
                        attributes: ['name'],
                    },
                    {
                        model: ItemCategoryTable,
                        attributes: ['name']
                    }
                ]
            });
            if (!result) {
                return HelperMethods.getErrorResponse("No data found");
            }


            const priceData: IRawMaterialPriceDetails[] = [];
            //@ts-ignore
            for (const item of result.RawMaterialPriceTables) {
                priceData.push({
                    price: item.getDataValue('price'),
                    moq: item.getDataValue('moq'),
                    supplierId: item.getDataValue('supplierId'),
                    supplier: item.SupplierTable.getDataValue('name'),
                    rawMaterialId: item.getDataValue('rawMaterialId'),
                    rawMaterial: result.getDataValue('name'),
                });
            }
            const data: IRawMaterialDetails = {
                id: result.getDataValue('id'),
                name: result.getDataValue('name'),
                unitId: result.getDataValue('unitId'),
                categoryId: result.getDataValue('categoryId'),
                sku: result.getDataValue('sku'),
                msq: result.getDataValue('msq'),
                status: result.getDataValue('status'),
                //@ts-ignore
                unitName: result.ItemUnitModel.getDataValue('name'),
                //@ts-ignore
                categoryName: result.ItemCategoryTable.getDataValue('name'),


                priceData: priceData,

                createdAt: result.getDataValue('createdAt'),
                updatedAt: result.getDataValue('updatedAt'),
                createdBy: result.getDataValue('createdBy'),
                updatedBy: result.getDataValue('updatedBy'),
                deletedBy: result.getDataValue('deletedBy'),
                deletedAt: result.getDataValue('deletedAt'),
            };

            return HelperMethods.getSuccessResponse(data);
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }


    async delete(ids: number[], deletedById: number): Promise<APIResponse<null>> {
        try {
            const transaction = await sequelize.transaction();
            await RawMaterialModal.update({
                status: RAW_MATERIAL_STAUS.DELETED,
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